import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { pipe } from 'rxjs';

export class Corrida{

    @ApiProperty({
      description: 'Identificação da Corrida',
    }) @IsString()
    idCorrida: String;

    @ApiProperty({
        description: 'Campo para identificar o Passageiro',
        minimum: 1,
        maximum: 50
      }) @IsNotEmpty({message: 'UID Do Passageiro não preenchido!'}) @IsString()
    uidPassageiro: String;

    @ApiProperty() @IsNotEmpty({message: 'Origem não preenchido!'})
    origemDetail: String;

    @ApiProperty()  @IsNotEmpty({message: 'Latitude da Origem não preenchido!'})
    origemLatitude: String;
    
    @ApiProperty()  @IsNotEmpty({message: 'Longitutde de Origem não preenchido!'}) 
    origemLongitude: String;
    
    @ApiProperty()  @IsNotEmpty()
    destinoDetail: String;
    
    @ApiProperty()  @IsNotEmpty()
    destinoLatitude: String;
    
    @ApiProperty()  @IsNotEmpty()
    destinoLongitude: String;
    
    @ApiProperty()  @IsNotEmpty()
    status: String;
    
    @ApiProperty()  @IsNotEmpty()
    uidMotorista: String;

    @ApiProperty() @IsEmail()
    emailMotorista: String;

}