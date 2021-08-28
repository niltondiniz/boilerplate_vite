import { Controller, Inject } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class Consumercontroller {


    @MessagePattern('corridas')
    consumir(@Payload() msg){
        console.log(msg);
    }


}