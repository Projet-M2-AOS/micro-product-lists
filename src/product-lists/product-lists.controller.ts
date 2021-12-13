import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Query
} from '@nestjs/common';
import {ObjectId} from "mongoose";
import {ProductListsService} from "./product-lists.service";
import {ProductList} from "./product-list.schema";
import {CreateProductListDto} from "./dto/create.product-list.dto";
import {UpdateProductListDto} from "./dto/update.product-list.dto";
import {ParseObjectIdPipe} from "../pipe/parse-mongoose-id.pipe";

@Controller('product-lists')
export class ProductListsController {
    constructor(private productListsService: ProductListsService) {}

    @Get()
    getProductLists(@Query('userId', ParseObjectIdPipe) userId: ObjectId): Promise<ProductList[]> {
        return this.productListsService.find({userId})
    }

    @Get(':idProductList')
    async getProductListById(@Param('idProductList', ParseObjectIdPipe) id: ObjectId): Promise<ProductList> {
        const productList = await this.productListsService.findById(id)

        if (!productList) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }

        return productList
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createProductList(@Body() createProductListDto: CreateProductListDto) {
        try {
            return await this.productListsService.create(createProductListDto)
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    @Put(':idProductList')
    async updateProductList(@Param('idProductList', ParseObjectIdPipe) id: ObjectId, @Body() updateProductListDto: UpdateProductListDto): Promise<ProductList> {
        let productList: ProductList;

        try {
            productList = await this.productListsService.findById(id)
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }

        if (!productList) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }

        try {
            await this.productListsService.update(id, updateProductListDto)
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }

        return this.productListsService.findById(id)
    }

    @Delete(':idProductList')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteProductList(@Param('idProductList', ParseObjectIdPipe) id: ObjectId) {
        let productList: ProductList;
        try {
            productList = await this.productListsService.findById(id)
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }


        if (!productList) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }

        await this.productListsService.delete(id)
    }
}
