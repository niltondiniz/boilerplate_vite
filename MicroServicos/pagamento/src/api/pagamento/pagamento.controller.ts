/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from "@nestjs/common";
import { Pagamento } from "./pagamento.entity";
import { PagamentoService } from "./pagamento.service";

import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("autotestgenerate")
export class PagamentoController {
  constructor(private PagamentoService: PagamentoService) {}

  @Post()
  autoTestGenerate(@Body() pagamento: Pagamento) {
    const resultado = this.PagamentoService.createPagamento(pagamento);
    return resultado;
  }


  @MessagePattern('Pagamentos')
  consumir(@Payload() msg){
      console.log(`Mensagem recebida do topico:: ${JSON.stringify(msg.value)}`);
      console.log(`Processando o pagamento...`);
      console.log(`Pagamento realizado com sucesso!`);
      msg.value.status = "Efetuado";
      console.log(`retorno:  ${JSON.stringify(msg.value)}`);
  }


}
