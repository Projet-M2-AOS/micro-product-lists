import { Test, TestingModule } from '@nestjs/testing';
import { ProductListsService } from './product-lists.service';

describe('ProductListsService', () => {
  let service: ProductListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductListsService],
    }).compile();

    service = module.get<ProductListsService>(ProductListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
