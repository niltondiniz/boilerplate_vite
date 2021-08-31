import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";

@WebSocketGateway()
export class CorridaGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server;
  users: number = 0;

  async handleConnection() {
    // A client has connected
    this.users++;
    // Notify connected clients of current users
    this.server.emit("users", this.users);
  }

  async handleDisconnect() {
    // A client has disconnected
    this.users--;
    // Notify connected clients of current users
    this.server.emit("users", this.users);
  }

  @SubscribeMessage("chat")
  async onNewRace(client, message) {
    console.log("client", client);
    console.log("message", message);

    client.broadcast.emit("chat", message);
  }
}
