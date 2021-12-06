import {ArrayMaxSize, IsArray, IsOptional, IsString, Length} from "class-validator";
import {ObjectId} from "mongoose";

export class UpdateProductListDto {
    @IsOptional()
    @IsString()
    @Length(0, 100)
    user: ObjectId

    @IsOptional()
    @IsString()
    @Length(0, 100)
    name: string

    @IsOptional()
    @IsArray()
    @ArrayMaxSize(15)
    @IsString({each: true})
    @Length(0, 100, { each: true })
    products: ObjectId[]
}
