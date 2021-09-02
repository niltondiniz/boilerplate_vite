

import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';

import { Pagamento } from './pagamento.entity';

@Injectable()
export class PagamentoService implements OnModuleInit{

    private kafkaProducer: Producer;

    constructor(
        @Inject('KAFKA_SERVICE')
        private clienteKafka: ClientKafka
    ){}

    async onModuleInit(){
        this.kafkaProducer = await this.clienteKafka.connect();
    }

    public async createPagamento(Pagamento: Pagamento){
      const resultado = await this.kafkaProducer.send({
          topic: 'Pagamentos',
          messages: [
              {
                  key: Math.random() + "" , value: JSON.stringify({Pagamento})
              }
          ]
      });  
    }





}
