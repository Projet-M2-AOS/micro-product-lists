import * as mongoose from "mongoose";
import {Prop, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";

export type ProductListDocument = ProductList & Document;

export class ProductList {
    @ApiProperty({type: String})
    _id: mongoose.Schema.Types.ObjectId

    @Prop({type: mongoose.Schema.Types.ObjectId})
    @ApiProperty({type: String})
    user: mongoose.Schema.Types.ObjectId

    @Prop()
    @ApiProperty()
    name: string

    @Prop({type: [mongoose.Schema.Types.ObjectId]})
    @ApiProperty({type: [String]})
    products: mongoose.Schema.Types.ObjectId[]
}

export const ProductListSchema = SchemaFactory.createForClass(ProductList);
