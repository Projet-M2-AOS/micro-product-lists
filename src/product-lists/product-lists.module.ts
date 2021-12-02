import { Module } from '@nestjs/common';
import { ProductListsService } from './product-lists.service';
import { ProductListsController } from './product-lists.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ProductList, ProductListSchema} from "./product-list.schema";

@Module({
  imports: [MongooseModule.forFeature([{name: ProductList.name, schema: ProductListSchema}])],
  providers: [ProductListsService],
  controllers: [ProductListsController]
})
export class ProductListsModule {}
