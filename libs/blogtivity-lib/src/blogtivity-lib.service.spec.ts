import { Test, TestingModule } from '@nestjs/testing';
import { BlogtivityLibService } from './blogtivity-lib.service';

describe('BlogtivityLibService', () => {
  let service: BlogtivityLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogtivityLibService],
    }).compile();

    service = module.get<BlogtivityLibService>(BlogtivityLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
