/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from "@nestjs/common";
import { Corrida } from "./corrida.entity";
import { CorridaService } from "./corrida.service";

@Controller("corrida")
export class CorridaController {
  constructor(private CorridaService: CorridaService) {}

  @Post()
  criaCorrida(@Body() corrida: Corrida) {
    const resultado = this.CorridaService.criaCorrida(corrida);
    return resultado;
  }
}
