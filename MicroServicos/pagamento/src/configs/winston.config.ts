import { utilities as nestWinstonModuleUtilities, WinstonModuleOptions, } from 'nest-winston';
import * as winston from 'winston'
var ElasticsearchApm = require('winston-elasticsearch-apm');

// var apm = require('elastic-apm-node').start({
//     serviceName: 'apm-service',
//     serverUrl: 'http://apm-server:8200',
// });

export const winstonConfig: WinstonModuleOptions = {
    levels: winston.config.npm.levels,
    level: 'verbose',
    transports: [
        //SETO O TRANSPORT DO WINSTON COMO CONSOLE PARA DEMONSTRAR O LOG NO CONSOLE
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                nestWinstonModuleUtilities.format.nestLike(),
            ),
        }),

        //COLOCO UM OUTRO TRANSPORTO DO TIPO ARQUIVO PARA SALVAR O LOG EM UM ARQUIVO
        new winston.transports.File({
            level: 'verbose',
            filename: 'application.log', //SETO O NOME DO ARQUIVO
            dirname: 'logs', //SETO A PASTA DO ARQUIVO
        }),
        //new ElasticsearchApm({ apm: apm })
    ],
};