import { Injectable } from '@nestjs/common';
import {FilterQuery, Model, ObjectId} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {ProductList, ProductListDocument} from "./product-list.schema";
import {CreateProductListDto} from "./dto/create.product-list.dto";
import {UpdateProductListDto} from "./dto/update.product-list.dto";

@Injectable()
export class ProductListsService {
    constructor(@InjectModel(ProductList.name) private productListModel: Model<ProductListDocument>) {
    }

    async create(createProductListDto: CreateProductListDto): Promise<ProductList> {
        const productList = new this.productListModel(createProductListDto);
        return productList.save();
    }

    async createMany(createProductListDtos: CreateProductListDto[]): Promise<ProductList[]> {
        return this.productListModel.insertMany(createProductListDtos);
    }

    delete(id: ObjectId) {
        return this.productListModel.findByIdAndDelete(id).exec()
    }

    update(id: ObjectId, updateProductListDto: UpdateProductListDto) {
        return this.productListModel.findByIdAndUpdate(id, updateProductListDto).exec()
    }

    async find(filter: FilterQuery<ProductListDocument>): Promise<ProductList[]> {
        return this.productListModel.find(filter).exec();
    }

    async findById(id: ObjectId): Promise<ProductList> {
        return this.productListModel.findById(id).exec();
    }
}
