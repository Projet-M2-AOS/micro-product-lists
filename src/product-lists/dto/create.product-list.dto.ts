import {ArrayMaxSize, IsArray, IsNotEmpty, IsString, Length} from "class-validator";
import {ObjectId} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";

export class CreateProductListDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(0, 100)
    @ApiProperty({
        description: `The id of the user who owns the list`,
        type: String,
        format: 'mongo-id',
        minLength: 0,
        maxLength: 100
    })
    user: ObjectId

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(0, 100)
    @ApiProperty({
        description: 'The name of the list',
        minLength: 0,
        maxLength: 100
    })
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    @ArrayMaxSize(15)
    @IsString({each: true})
    @Length(0, 100, { each: true })
    @ApiProperty({
        description: 'An array containing product ids',
        type: [String],
        maxItems: 15,
    })
    products: ObjectId[]
}
