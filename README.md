<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://www.radixeng.com.br/images/logos/radix-logo-completo.png" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">Modelo para criação de API/Microservices usando Kafka e WebSockets</p>
    <p align="center">

# Boilerplate NodeJS

## Conhecendo os containers

  O projeto possui 13 containers, sendo eles distribuidos nos seguintes ambientes:
  1. ELK, os 3 containers que funcionam neste ambiente são responsáveis por manter a funcionalidade de logs do projeto. Neste ambiente funcionam:
  - FluentBit: Log Processor, responsavél por absorver os logs gerados no container que implementa o "fluentd" como "log driver", e enviá-los ao elasticsearch
  - Elasticsearch: Mecanismo de busca e analise de dados
  - Kibana: Interface para visualização de dados. Tem como origem de dados várias fontes possíveis. A utilizada no projeto será o Elasticsearch.
  2. Api, uma imagem usando Node, responsável por manter a API
  3. Kafka, possui 9 containers responsáveis por manter o ecossistema do Kafka.

  ## Levantando o ambiente

  Todo o projeto está rodando no ambiente do Docker, para subir o ambiente basta rodar dentro da pasta raiz no projeto: 
  - **docker-compose build**
  - **docker-compose up -d**

  Obs: 
  - Dependendo da capacidade do maquina que está sendo utilizada, será necessário aumentar a memória ram disponível para o Docker nas configurações do próprio docker.
  - O comando **docker-compose ps** verifica o estado dos containers.
  - Caso um container não suba execute novamente o comando **docker-compose up -d**
  - Para parar o ambiente execute: **docker-compose** down

  ## Acessando os containers

  ### API
  - http://localhost:3000

  ### Kibana
  - http://localhost:5601

  ### Kafka Control-Center
  - http://localhost:9021