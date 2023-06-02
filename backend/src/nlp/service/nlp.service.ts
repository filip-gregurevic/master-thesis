import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NLPSearch } from '../entity/nlp-search.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NLPService {
  private readonly logger = new Logger(NLPService.name);

  constructor(
    @InjectRepository(NLPSearch)
    private readonly nlpSearchRepository: Repository<NLPSearch>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  findByUserId(userId: number): Promise<NLPSearch[]> {
    this.logger.debug(`Find NLP searches by userId: ${userId}`);

    return this.nlpSearchRepository.find({ where: { user: { id: userId } } });
  }

  async search(sentence) {
    this.logger.debug(`NLP search for sentence: ${sentence}`);

    const vector = await this.infer(sentence);

    console.log(vector);

    const response = await firstValueFrom(
      this.httpService.get(
        `${this.configService.get<string>(
          'ELASTICSEARCH_URL',
        )}/mitre-embedded/_knn_search`,
        {
          data: {
            knn: {
              field: 'text_embedding.predicted_value',
              query_vector: vector,
              k: 10,
              num_candidates: 100,
            },
          },
        },
      ),
    );

    console.log(response.data.hits.hits);
    return response.data.hits.hits;
  }

  async infer(sentence) {
    this.logger.debug(`Inference for sentence: ${sentence}`);

    const response = await firstValueFrom(
      this.httpService.post(
        `${this.configService.get<string>(
          'ELASTICSEARCH_URL',
        )}/_ml/trained_models/sentence-transformers__all-distilroberta-v1/deployment/_infer`,
        {
          docs: {
            text_field: sentence,
          },
        },
      ),
    );

    return response.data.predicted_value;
  }

  deleteById(searchId: number) {
    this.logger.debug(`Delete NLP search with id: ${searchId}`);

    return this.nlpSearchRepository.delete(searchId);
  }
}
