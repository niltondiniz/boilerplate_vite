import { CorridaService } from "./corrida.service";
import { CorridaGateway } from "./corrida.gateway";

/*
https://docs.nestjs.com/modules
*/

import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CorridaController } from "./corrida.controller";

import { KafkaConfig } from '../../configs/kafka.config'
@Module({
  imports: [
    ClientsModule.register([
      {
        name: KafkaConfig.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [KafkaConfig.broker],
          },
          consumer: {
            groupId: KafkaConfig.consumer.groupId,
          },
        },
      },
    ]),
  ],
  controllers: [CorridaController],
  providers: [CorridaService, CorridaGateway],
})
export class CorridaModule {}
