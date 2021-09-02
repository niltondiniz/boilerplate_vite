import { PagamentoService } from "./pagamento.service";
import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PagamentoController } from "./pagamento.controller";

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
            groupId: KafkaConfig.consumer.groupId + Math.random(),
          },
        },
      },
    ]),
  ],
  controllers: [PagamentoController],
  providers: [PagamentoService],
})
export class PagamentoModule {}
