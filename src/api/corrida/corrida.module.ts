import { CorridaService } from './corrida.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CorridaController } from './corrida.controller';

@Module({
    imports: [

        ClientsModule.register([
            {
              name: 'KAFKA_SERVICE',
              transport: Transport.KAFKA,
              options: {
                client: {
                  brokers: ['broker:29092'],
                },
                consumer: {
                  groupId: 'my-consumer-' + Math.random(),
                },
              },
            },
          ]),

    ],
    controllers: [
        CorridaController,
    ],
    providers: [
        CorridaService,],
})
export class CorridaModule { }
