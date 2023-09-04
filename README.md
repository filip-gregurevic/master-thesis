# Prototype - Enhancing Cyber Threat Intelligence

This is the repository for the Master Thesis "Enhancing Cyber Threat Intelligence" by Filip
Gregurević at the Krcmar Lab of the School of Computation, Information and Technology - Informatics of The Technical
University of Munich.

At one point in time, you were able to find a live version of this project
on [search.brooca.io](https://search.brooca.io).

You can find the GitHub repository here: https://github.com/filip-gregurevic/master-thesis

In case you have any questions, feel free to reach out via e-mail to filipgregurevic@gmail.com or
filip.gregurevic@tum.de.

## Quick Start

This describes the method to start the system as quickly as possible without hot-reloading.

1. Start the system using docker compose. This will start all services necessary to run the prototype. Navigate to the
   root folder and run the following command:

   ```docker compose up```

2. Import the database dump as described in the Database section of the Setup
3. Import the ElasticSearch data as described in the ElasticSearch section of the Setup
4. Start the ElasticSearch trial as described in the ElasticSearch section of the Setup (Hint: use the provided postman
   collection)

After these steps, you should be able to find the prototype running on `localhost:3000` and you can log in using the
email `admin@admin.com` and password `Admin123`

NOTE: For the sake of evaluating this prototype, the OpenAI API key is shared. In case of any wrongdoing or misuse, it
will be invalidated.
To add your own API key follow the steps described in the ChatGPT section.

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
It includes an admin account (email: `admin@admin.com`, password `Admin123`) and the MITRE ATT&CK and D3FEND data.
Here two ways are described how to restore a database from a
dump: https://tableplus.com/blog/2018/08/postgresql-how-to-backup-and-restore-database.html

In case you only need the MITRE ATT&CK and D3FEND data you can find it in separate CSV files within the `/data` folder.
The following provides guides on how to back up and restore Postgres databases using TablePlus or the Command
Line: https://tableplus.com/blog/2018/08/postgresql-how-to-backup-and-restore-database.html.

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

### ElasticSearch

Before being able to use the started ElasticSearch instance, you have to at least complete the following two steps:

1. Start the ElasticSearch trial in order to use the ML functionalities, such as the KNN search algorithm.

   The easiest way to do this, is importing the Postman collection and executing the "Start Trial" request.

2. Import the index containing the MITRE data with already included embeddings. You can find it in the `/elasticsearch`
   folder called `/mitre-embedded-index.json`

   You can either import the index using the data upload feature of kibana or with a post request:

    ```
    curl -XPOST "http://localhost:9200/mitre-embedded/_bulk" -H "Content-Type: application/json" --data-binary "@mitre-embedded-index.json"
    ```

You can find selected HTTP-requests to your local Elasticsearch instance in the postman collection in the `/postman`
folder.

In case you want to set up the ElasticSearch instance from scratch by yourself, you have to complete the following
steps:

1. Start trial: Necessary for using AI
2. Import the pretrained model using eland
3. Import the data into an index
4. Setup ingress pipeline
5. Process data
6. Re-index using the ingress pipeline

You can find guides on how to perform these steps here:

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

#### Bonus Info:

Useful tool to convert excel to ndjson: https://konbert.com/convert/excel/to/ndjson

eland image for import:
clone eland repo: https://github.com/elastic/eland
start container & run command:

```shell
docker run -it --rm elastic/eland \
    eland_import_hub_model \
    --url http://elasticsearch:9200 \ 
    --hub-model-id sentence-transformers/all-distilroberta-v1 \
    --task-type text_embedding \
    --start
```

Useful links:

* https://blog.devgenius.io/elasticsearch-and-kibana-installation-using-docker-compose-886c4823495e
* https://www.elastic.co/guide/en/kibana/current/docker.html
* https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html

NOTE: elasticsearch on docker is started without any security, it is not suited for production setup

### ChatGPT

In order for the integration to ChatGPT to work, you only have to include your OpenAI API key in the `.env`
or `.env.local` file.

In case you don't have an OpenAI API Key already, here is a guide which explains how you can obtain
it: https://www.howtogeek.com/885918/how-to-get-an-openai-api-key/

## Running the Project

You can either start up the whole project at once using docker

Note: This doesn't support hot-reloading for the frontend and backend,
but you can also start some services individually and run the rest using docker compose.

```shell
docker compose up
```

or you can use the docker desktop application or the docker management in your IDE (if you use IntelliJ or WebStorm).

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

This repository also contains the pipelines for CI/CD for Google Cloud
It was hosted using:

* Serverless Google Cloud Run for frontend and backend
* Google Compute Engine for Elasticsearch and Kibana
* Google GCR for hosting the docker images
* Google Cloud SQL database for Postgres

The GitHub actions are also provided in this repository to automatically build and deploy the prototype. You can find a
guide on hot to do this
here: https://medium.com/google-cloud/how-to-deploy-your-cloud-run-service-using-github-actions-e5b6a6f597a3

Any other hosting can be used, e.g. AWS ECS, since all applications in this project are dockerized. The system can also
be deployed on
single server (or virtual machine) using docker compose for example.
compose
