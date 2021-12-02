import {ArrayMaxSize, IsArray, IsOptional, IsString, Length} from "class-validator";
import mongoose from "mongoose";

export class UpdateProductListDto {
    @IsOptional()
    @IsString()
    @Length(0, 100)
    user: mongoose.Schema.Types.ObjectId

    @IsOptional()
    @IsString()
    @Length(0, 100)
    name: string

    @IsOptional()
    @IsArray()
    @ArrayMaxSize(15)
    @IsString({each: true})
    @Length(0, 100, { each: true })
    products: mongoose.Schema.Types.ObjectId[]
}
