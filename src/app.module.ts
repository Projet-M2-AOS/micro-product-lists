import { Module } from '@nestjs/common';
import { ProductListsModule } from './product-lists/product-lists.module';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/product-lists'), ProductListsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
