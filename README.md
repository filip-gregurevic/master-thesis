# Filip Gregurević's Master Thesis

This is the repository for the Master Thesis "Exploring Potentials to Automate and Support Cyber Security Work" by Filip
Gregurević
filipgregurevic@gmail.com
filip.gregurevic@tum.de

## Technology Stack

Database Postgres
Frontend Vue3 + vuetify
Backend Nestjs + ElasticSearch + Kibana

## Prerequisites

* [Node](https://nodejs.org/en) version 18.10
* npm 8.19.2
* docker

Other useful tools and recommendations for developing this project:

* [iTerm2](https://iterm2.com/): A better alternative to the standard macOS terminal
* [WebStorm](https://www.jetbrains.com/webstorm/): My preferred IDE for developing TypeScript-based applications (the
  license is also provided by TUM)
* [nvm](https://github.com/nvm-sh/nvm): Node Version Manager, in case you have to support multiple versions of Node on
  your machine
* [fig](https://fig.io/): Provides useful features if you're working a lot with the terminal, such as improved
  autocompletion
* [Postman](https://www.postman.com/): A useful tool to execute and test API calls
* [TablePlus](https://tableplus.com/): Good GUI for managing and interacting with the database

## Setup & Installation

Before starting you have to clone the repository.

### Database

None, but also optional to run completly locally instead of docker
dump in /database folder for quick start with mitre attack & defend and admin account

And csv for import:
how to import with table plus

### Backend

```shell
cd backend
```

```shell
cp .env.local .env
```

Generate JWT Secret

Add your OpenAI API Key
Guide how to obtain API Key: https://www.howtogeek.com/885918/how-to-get-an-openai-api-key/
Note this service costs

```shell
yarn
```

Note: This step is only needed for local development

### Frontend

```shell
cd frontend
```

Note: this step is only needed for local development

### Elasticsearch

1. Start trial: Necessary for using AI
2. Import the pretrained model
3. Import the data into an index
4. Setup ingress pipeline
5. Process data
6. Re-index

useful tool to convert excel to ndjson: https://konbert.com/convert/excel/to/ndjson

eland image for import:
clone eland repo: https://github.com/elastic/eland
start container & run command:

```shell
docker run -it --rm --network=master-thesis_default elastic/eland \
    eland_import_hub_model \
    --url http://elasticsearch:9200 \
    --hub-model-id sentence-transformers/all-distilroberta-v1 \
    --task-type text_embedding \
    --start
```

Links:

* https://www.elastic.co/de/blog/how-to-deploy-nlp-text-embeddings-and-vector-search
* https://www.elastic.co/de/blog/text-similarity-search-with-vectors-in-elasticsearch
* https://www.elastic.co/guide/en/elasticsearch/reference/current/dense-vector.html
* https://www.elastic.co/guide/en/elasticsearch/reference/current/knn-search.html
* https://www.elastic.co/guide/en/machine-learning/master/ml-nlp-inference.html
* https://www.elastic.co/guide/en/elasticsearch/reference/8.7/inference-processor.html#inference-processor-classification-opt
* https://discuss.elastic.co/t/authorization-exception-when-trying-to-import-model-to-elasticsearch-cluster/309840
* https://discuss.elastic.co/t/dec-21st-2022-en-how-to-import-an-ml-model-with-eland-if-youre-not-a-python-developer/318465

setup:

* https://blog.devgenius.io/elasticsearch-and-kibana-installation-using-docker-compose-886c4823495e
* https://www.elastic.co/guide/en/kibana/current/docker.html

note elasticsearch on docker is not started with any security, not suited for production setup

## Running the Project

You can either start up the whole project at once using docker

Note: This doesn't support hot-reloading for the frontend and backend,
but you can also start some services individually and run the rest using docker compose.

docker compose up

or you can use the docker desktop application or the docker management in your IDE.

### Running Services Individually

#### Backend

```shell
cd backend
```

```shell
yarn start:dev
```

The backend should now be available at `localhost:3333` within a few moments.
Also starts the swagger documentation at `localhost:3333/docs`.

#### Frontend

```shell
cd frontend
```

```shell
yarn dev
```

The frontend should now be available at `localhost:3000` within a few moments.

## Deployment & Hosting

Currently hosted on Google Cloud
Serverless Google Cloud Run for frontend and backend
Elasticsearch with following config: TODO
Database Hosted Postegres

Only setup needed Google cloud project setup
database setup
and adding env vars after services are running

Deployment automated using GitHub Workflows
Config
crete service worker and add secrets and variables to github secrets

Docker images in gcr

Any other hosting can be used, e.g. AWS ECS, since app is dockerized or also deployed on single server with docker
compose
NOTE: see security elasticsearch

