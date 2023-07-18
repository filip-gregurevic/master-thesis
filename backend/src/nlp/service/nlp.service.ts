import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NLPSearch } from '../entity/nlp-search.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class NLPService {
  private readonly logger = new Logger(NLPService.name);

  constructor(
    @InjectRepository(NLPSearch)
    private readonly nlpSearchRepository: Repository<NLPSearch>,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  findByUserId(userId: number): Promise<NLPSearch[]> {
    this.logger.debug(`Find NLP searches by userId: ${userId}`);

    return this.nlpSearchRepository.find({ where: { user: { id: userId } } });
  }

  async search(userId: number, sentence: string) {
    this.logger.debug(`NLP search for sentence: ${sentence}`);

    const user = await this.userService.findById(userId);

    const vector = await this.infer(sentence);

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
          headers: {
            Authorization:
              'ApiKey UHV4TmFva0JLQXdUc2VNV2dNVDk6QU1xNHdaTGRRMFc2Rm5QSWJMdE1jQQ==',
          },
        },
      ),
    );

    const search = this.nlpSearchRepository.create();

    search.user = user;
    search.sentence = sentence;

    await this.nlpSearchRepository.save(search);
    return { ...search, hits: response.data.hits.hits };
  }

  async loadById(searchId: number) {
    this.logger.debug(`Load NLP Search with id: ${searchId}`);

    const search = await this.nlpSearchRepository.findOneBy({ id: searchId });

    const vector = await this.infer(search.sentence);

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
          headers: {
            Authorization:
              'ApiKey UHV4TmFva0JLQXdUc2VNV2dNVDk6QU1xNHdaTGRRMFc2Rm5QSWJMdE1jQQ==',
          },
        },
      ),
    );

    return { ...search, hits: response.data.hits.hits };
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
        {
          headers: {
            Authorization:
              'ApiKey UHV4TmFva0JLQXdUc2VNV2dNVDk6QU1xNHdaTGRRMFc2Rm5QSWJMdE1jQQ==',
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
