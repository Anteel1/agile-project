import { IsNotEmpty, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class ProductDto {
    @IsNotEmpty()
    @Length(2, 30)
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    img: string;

    @IsNotEmpty()
    @ApiProperty()
    price: string;

}

