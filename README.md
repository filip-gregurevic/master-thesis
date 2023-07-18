# Prototype - Exploring Potentials to Automate and Support Cyber Security Work

This is the repository for the Master Thesis "Exploring Potentials to Automate and Support Cyber Security Work" by Filip
Gregurević at the Krcmar Lab of the School of Computation, Information and Technology - Informatics of The Technical
University of Munich.

Currently, you can find a live version of this project on [search.brooca.io](https://search.brooca.io).

filipgregurevic@gmail.com
filip.gregurevic@tum.de

## Technology Stack

The technology stack for this prototype consists of Vue3 for the frontend utilizing Vuetify as the component library.

The backend is built using NestJS.

The selected database engine is Postgres.

In addition, Elasticsearch and Kibana are leveraged for advanced searching mechanism.

All components of this project are dockerized for more comfortable development and hosting.

## Prerequisites

This prototype was built using the following environment:

* [Node](https://nodejs.org/en) version 18.10
* [yarn](https://yarnpkg.com/) version 1.22.19
* [docker](https://www.docker.com/)

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

For access to GitHub ask the current maintainer.

### Database

There is no setup necessary for the database as it can be started using docker.
You can also install and run the database completely locally. For this refer to the official documentation.

For a faster and easier setup, you can also import the database dump located in the `/data` folder.
It includes an admin account (email: `admin@admin.com`, password `admin123`) and the MITRE ATT&CK and D3FEND data.
Link to how to import database dump with tableplus

In case you only need the MITRE ATT&CK and D3FEND data you can find it in separate CSV files within the `/data` folder.
how to import with table plus

### Backend

In order to run the NestJS backend, you have to follow a few simple steps first.

First, navigate to the `backend` folder using your preferred terminal.

```shell
cd backend
```

Next, copy the contents of the `.env.local` file to a `.env` file. The `.env.local` file already contains some
environment variables suitable for local development.

```shell
cp .env.local .env
```

Generate a JWT Secret.

Add your OpenAI API Key
Guide how to obtain API Key: https://www.howtogeek.com/885918/how-to-get-an-openai-api-key/
Note this service costs

Lastly, install the dependencies.

```shell
yarn
```

**Note**: The last step is only needed for local development.

### Frontend

You don't have to perform any steps in order to run the Vue frontend. The following steps are only necessary if you want
to develop locally.

First, navigate to the `frontend` folder using your preferred terminal.

```shell
cd frontend
```

Lastly, install the dependencies.

```shell
yarn
```

### Elasticsearch

You can find selected HTTP-requests to your local Elasticsearch instance in the postman collection in the `/postman`
folder.

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
docker run -it --rm elastic/eland \
    eland_import_hub_model \
    --cloud-id eb6a146a2fe548d0a969a6c3c57b9c00:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQxYjA3YzRhMmUyNjY0ZWMwOTIxMmU2MDg1ODZkNDEzZSRkODA3NTA0ZWM1OTg0YTY0YjVlMmU4NmY2ODFiMDhmMw== \ 
    -u f.gregurevic@driverhero.de -p filipIstCool123 \ 
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
* https://www.elastic.co/de/blog/how-to-deploy-nlp-sentiment-analysis-example
* https://www.elastic.co/blog/text-similarity-search-with-vectors-in-elasticsearch

setup:

* https://blog.devgenius.io/elasticsearch-and-kibana-installation-using-docker-compose-886c4823495e
* https://www.elastic.co/guide/en/kibana/current/docker.html
* https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html

NOTE: elasticsearch on docker is started without any security, it is not suited for production setup

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
Database Hosted Postgres

Only setup needed Google cloud project setup
database setup
and adding env vars after services are running

Deployment automated using GitHub Workflows
Config
crete service worker and add secrets and variables to GitHub secrets

Docker images in gcr

Any other hosting can be used, e.g. AWS ECS, since all applications in this project are dockerized or also deployed on
single server (or virtual machine) using docker
compose
NOTE: see security elasticsearch

docker run --name elasticsearch --net elastic -p 9200:9200 -p 9300:9300 -e xpack.security.enabled=false -e
discovery.type=single-node -v elasticsearch-data:/usr/share/elasticsearch/data --ulimit nofile=65536:65536 --ulimit
memlock=-1:-1 docker.elastic.co/elasticsearch/elasticsearch:8.8.0

docker pull docker.elastic.co/kibana/kibana:8.7.1

docker run --name kibana --net elastic -p 5601:5601 -e ELASTICSEARCH_HOSTS=http://elasticsearch:9200 -v kibana-data:
/usr/share/kibana/data docker.elastic.co/kibana/kibana:8.7.1
