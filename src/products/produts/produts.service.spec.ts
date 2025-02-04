import { Test, TestingModule } from '@nestjs/testing';
import { ProdutsService } from './products.service';

describe('ProdutsService', () => {
  let service: ProdutsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutsService],
    }).compile();

    service = module.get<ProdutsService>(ProdutsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
