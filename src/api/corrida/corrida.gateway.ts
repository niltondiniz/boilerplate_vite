
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from "@nestjs/websockets";

const wsPort = parseInt( process.env.WS_PORT );

@WebSocketGateway(3001) //informo a porta do websocket
export class CorridaGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server; //inicializo o servidor
  users: number = 0;

  async handleConnection() { //qnd executa uma nova conexão de usuario na porta
    this.users++;
    console.log(`Websocket conectado na porta ${process.env.WS_PORT}`);
    console.log(`Usuario conectado: ${this.users}`);
    this.server.emit("users", `Usuario conectado: ${this.users}`); //envio uma resposta pro usuario no tunel chamado usuario

    
  }

  async handleDisconnect() { //quando executo uma desconexão do cliente
    console.log('Websocket Desconectado!');
    this.users--;
    this.server.emit("users", this.users); //envio mensagem pro usuario no tunel chamado usuario
  }


  @SubscribeMessage('corrida') //se receber uma mensagem no tunel chamado corrida
  handleEvent(@MessageBody() data: string): string {
    console.log('Entrou no tunel corrida');
    this.server.emit("corrida", `Voce enviou a msg: ${data}`); //retorno para o usuario a msm mensagem que ele me enviou
    return data;
  }

 
}
