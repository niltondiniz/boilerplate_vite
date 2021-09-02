import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { pipe } from 'rxjs';

export class Pagamento{

    @ApiProperty({
        description: 'ID da Corrida',
        minimum: 1,
        maximum: 50
      }) @IsNotEmpty({message: 'ID DA CORRIDA NAO INFORMADO!'}) @IsString({message: 'ID da corrida deve ser uma string.'})
    idCorrida: String;

    @ApiProperty()
    status: String;


}