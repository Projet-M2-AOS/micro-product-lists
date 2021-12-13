import {Body, Query, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseArrayPipe, Post, Put} from '@nestjs/common';
import {ObjectId} from "mongoose";
import {ProductListsService} from "./product-lists.service";
import {ProductList} from "./product-list.schema";
import {CreateProductListDto} from "./dto/create.product-list.dto";
import {UpdateProductListDto} from "./dto/update.product-list.dto";
import {ParseObjectIdPipe} from "../pipe/parse-mongoose-id.pipe";
import {ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('product-lists')
@ApiTags('micro-product-lists')
export class ProductListsController {
    constructor(private productListsService: ProductListsService) {}

    @Get()
    @ApiOperation({
        summary: 'Get product-lists based on filters'
    })
    @ApiQuery({
        name: 'userId',
        description: 'The userId filter',
        schema: {
            type: 'string',
            format: 'mongo-id'
        }
    })
    @ApiResponse({status: HttpStatus.OK, type: [ProductList]})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Invalid id supplied'})
    getProductLists(@Query('userId', ParseObjectIdPipe) userId: ObjectId): Promise<ProductList[]> {
        return this.productListsService.find({userId})
    }

    @Get(':idProductList')
    @ApiOperation({
        summary: 'Get product-lists by id'
    })
    @ApiParam({
        name: 'idProductList',
        description: 'The id of the list you want to get',
        required: true,
        schema: {
            type: 'string',
            format: 'mongo-id'
        }
    })
    @ApiResponse({status: HttpStatus.OK, type: ProductList})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Invalid id supplied'})
    @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Product list not found'})
    async getProductListById(@Param('idProductList', ParseObjectIdPipe) id: ObjectId): Promise<ProductList> {
        const productList = await this.productListsService.findById(id)

        if (!productList) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }

        return productList
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Create product-lists'
    })
    @ApiBody({type: [CreateProductListDto]})
    @ApiResponse({status: HttpStatus.OK, type: [ProductList], description: 'The product lists created'})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Invalid schema supplied'})
    async createProductList(@Body(new ParseArrayPipe({ items: CreateProductListDto })) createProductListDto: CreateProductListDto[]) {
        try {
            return await this.productListsService.createMany(createProductListDto)
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    @Put(':idProductList')
    @ApiOperation({
        summary: 'Update one product-list'
    })
    @ApiParam({
        name: 'idProductList',
        description: 'The id of the list you want to update',
        required: true,
        schema: {
            type: 'string',
            format: 'mongo-id'
        }
    })
    @ApiResponse({status: HttpStatus.OK, type: ProductList, description: 'The product list updated'})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Invalid schema supplied'})
    @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Product list not found'})
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
    @ApiOperation({
        summary: 'Delete one product-list'
    })
    @ApiParam({
        name: 'idProductList',
        description: 'The id of the list you want to delete',
        required: true,
        schema: {
            type: 'string',
            format: 'mongo-id',
        }
    })
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'Successfully deleted'})
    @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Product list not found'})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Invalid id supplied'})
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
