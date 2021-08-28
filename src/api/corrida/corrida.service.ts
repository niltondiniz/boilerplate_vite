

import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';

import { Corrida } from './corrida.entity';

@Injectable()
export class CorridaService implements OnModuleInit{

    private kafkaProducer: Producer;

    constructor(
        @Inject('KAFKA_SERVICE')
        private clienteKafka: ClientKafka
    ){}

    async onModuleInit(){
        this.kafkaProducer = await this.clienteKafka.connect();
    }

    public async criaCorrida(corrida: Corrida){
      const resultado = await this.kafkaProducer.send({
          topic: 'corridas',
          messages: [
              {
                  key: Math.random() + "" , value: JSON.stringify({corrida})
              }
          ]
      });  
    }





}
