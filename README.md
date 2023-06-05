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

* node 18.10
* npm 8.19.2
* docker

Other useful tools and recommendations for developing

* nvm
* fig
* webstorm IDE
* Postman
* TablePlus

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

Not: this step is only needed for local development

### Elasticsearch

1. Start trial: Necessary for using AI
2. Import the pretrained model
3. Import the data into an index
4. Setup ingress pipeline
5. Process data
6. Re-index

useful tool to convert excel to ndjson: https://konbert.com/convert/excel/to/ndjson

eland image for import:
close eland repo
start container & run command:

```shell
docker run -it --rm --network=master-thesis_default elastic/eland \
    eland_import_hub_model \
    --url http://elasticsearch:9200 \
    --hub-model-id sentence-transformers/all-distilroberta-v1 \
    --task-type text_embedding \
    --start
```

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

