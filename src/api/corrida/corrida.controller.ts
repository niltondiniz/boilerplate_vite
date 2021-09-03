/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, HttpStatus, Post} from "@nestjs/common";
import { Corrida } from "./corrida.entity";
import { CorridaService } from "./corrida.service";

import { NestResponse } from '../../core/http/nest-response';
import { NestResponseBuilder } from '../../core/http/nest-response-builder';
import { transcode } from "buffer";

@Controller("corrida")
export class CorridaController {
  constructor(private CorridaService: CorridaService) {}

  @Post()
  criaCorrida(@Body() corrida: Corrida) : NestResponse {
    const resultado = this.CorridaService.criaCorrida(corrida);

    //aqui demonstramos a geracao de uma excecao e a qualquer excecao é chamada o arquivo de filter
    //throw new Error("Erro ao criar corrida."); 
    

    //AQUI TRATAMOS A REPOSTA QUE SERÁ DADA NO NAVEGADOR
    //retornamos o codigo que desejamos, e também os headers que desejarmos.
    return new NestResponseBuilder()
        .status(HttpStatus.CREATED)
        .headers({
            'Location': `/corrida/${resultado.idCorrida}`
        })
        .body(resultado)
        .build();

  }
}
