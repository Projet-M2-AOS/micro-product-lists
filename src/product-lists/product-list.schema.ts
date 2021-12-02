import * as mongoose from "mongoose";
import {Prop, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

export type ProductListDocument = ProductList & Document;

export class ProductList {
    _id: mongoose.Schema.Types.ObjectId

    @Prop({type: mongoose.Schema.Types.ObjectId})
    user: mongoose.Schema.Types.ObjectId

    @Prop()
    name: string

    @Prop({type: [mongoose.Schema.Types.ObjectId]})
    products: mongoose.Schema.Types.ObjectId[]
}

export const ProductListSchema = SchemaFactory.createForClass(ProductList);
