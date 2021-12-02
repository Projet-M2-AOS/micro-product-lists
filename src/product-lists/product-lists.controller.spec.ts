import { Test, TestingModule } from '@nestjs/testing';
import { ProductListsController } from './product-lists.controller';

describe('ProductListsController', () => {
  let controller: ProductListsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductListsController],
    }).compile();

    controller = module.get<ProductListsController>(ProductListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
