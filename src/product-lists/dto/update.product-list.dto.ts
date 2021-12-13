import {ArrayMaxSize, IsArray, IsOptional, IsString, Length} from "class-validator";
import {ObjectId} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateProductListDto {
    @IsOptional()
    @IsString()
    @Length(0, 100)
    @ApiProperty({
        description: `The id of the user who owns the list`,
        required: false,
        type: String,
        format: 'mongo-id',
        minLength: 0,
        maxLength: 100
    })
    user: ObjectId

    @IsOptional()
    @IsString()
    @Length(0, 100)
    @ApiProperty({
        description: 'The name of the list',
        required: false,
        minLength: 0,
        maxLength: 100
    })
    name: string

    @ApiProperty()
    @IsOptional()
    @IsArray()
    @ArrayMaxSize(15)
    @IsString({each: true})
    @Length(0, 100, { each: true })
    @ApiProperty({
        description: 'An array containing product ids',
        required: false,
        type: [String],
        maxItems: 15
    })
    products: ObjectId[]
}
