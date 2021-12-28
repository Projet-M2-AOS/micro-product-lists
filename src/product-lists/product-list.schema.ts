import * as mongoose from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";

export type ProductListDocument = ProductList & Document;

@Schema()
export class ProductList {
    @ApiProperty({
        type: String,
        format: 'mongo-id',
        minLength: 0,
        maxLength: 100
    })
    _id: mongoose.Schema.Types.ObjectId

    @Prop({type: mongoose.Schema.Types.ObjectId})
    @ApiProperty({
        type: String,
        format: 'mongo-id',
        minLength: 0,
        maxLength: 100
    })
    user: mongoose.Schema.Types.ObjectId

    @Prop()
    @ApiProperty({
        minLength: 0,
        maxLength: 100
    })
    name: string

    @Prop({type: [mongoose.Schema.Types.ObjectId]})
    @ApiProperty({
        type: String,
        format: 'mongo-id',
        isArray: true,
        maxItems: 15
    })
    products: mongoose.Schema.Types.ObjectId[]
}

export const ProductListSchema = SchemaFactory.createForClass(ProductList);
