import { ConfigModule } from '@nestjs/config';
import { PagamentoModule } from './api/pagamento/pagamento.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config';
// import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerInterceptor } from './interceptors/logger.interceptor'; //importo meu interceptador
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { HttpModule } from '@nestjs/axios';
// import { KafkaConfig } from './configs/kafka.config';

const ENV = process.env.NODE_ENV;


@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: `./env/${ENV}.env`, isGlobal: true}), //configuracao do arquivo de configuracoes
    PagamentoModule,
    HttpModule,
    TerminusModule, 
    WinstonModule.forRoot(winstonConfig),
    // ClientsModule.register([
    //   {
    //     name: KafkaConfig.name,
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         brokers: [KafkaConfig.broker],
    //       },
    //       consumer: {
    //         groupId: KafkaConfig.consumer.groupId + Math.random(),
    //       },
    //     },
    //   },
    // ]),
  ],
  controllers: [
     AppController, HealthController],
  providers: [AppService,
      {
        provide: APP_INTERCEPTOR, //aqui adiciono um provedor que será provido de um interceptador
        useClass: LoggerInterceptor, //que este interceptador será a nossa classe LoggerInterceptor
      },
    ],
})
export class AppModule { }
