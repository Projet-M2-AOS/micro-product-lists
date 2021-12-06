import {ArrayMaxSize, IsArray, IsNotEmpty, IsString, Length} from "class-validator";
import {ObjectId} from "mongoose";

export class CreateProductListDto {

    @IsNotEmpty()
    @IsString()
    @Length(0, 100)
    user: ObjectId

    @IsNotEmpty()
    @IsString()
    @Length(0, 100)
    name: string

    @IsNotEmpty()
    @IsArray()
    @ArrayMaxSize(15)
    @IsString({each: true})
    @Length(0, 100, { each: true })
    products: ObjectId[]
}
