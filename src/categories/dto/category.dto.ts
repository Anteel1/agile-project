import { IsNotEmpty, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CategoryDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(2, 16)
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    img: string;

}

