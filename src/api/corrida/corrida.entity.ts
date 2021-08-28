import { ApiProperty } from '@nestjs/swagger';

export class Corrida{
    @ApiProperty()
    uidPassageiro: String;
    @ApiProperty()
    origemDetail: String;
    @ApiProperty()
    origemLatitude: String;
    @ApiProperty()
    origemLongitude: String;
    @ApiProperty()
    destinoDetail: String;
    @ApiProperty()
    destinoLatitude: String;
    @ApiProperty()
    destinoLongitude: String;
    @ApiProperty()
    status: String;
    @ApiProperty()
    uidMotorista: String;

}