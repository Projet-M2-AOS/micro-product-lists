import mongoose from "mongoose";
import {ArrayMaxSize, IsArray, IsNotEmpty, IsString, Length} from "class-validator";

export class CreateProductListDto {

    @IsNotEmpty()
    @IsString()
    @Length(0, 100)
    user: mongoose.Schema.Types.ObjectId

    @IsNotEmpty()
    @IsString()
    @Length(0, 100)
    name: string

    @IsNotEmpty()
    @IsArray()
    @ArrayMaxSize(15)
    @IsString({each: true})
    @Length(0, 100, { each: true })
    products: mongoose.Schema.Types.ObjectId[]
}
