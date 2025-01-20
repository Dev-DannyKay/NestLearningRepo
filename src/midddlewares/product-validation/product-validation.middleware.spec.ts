import { ProductValidationMiddleware } from './product-validation.middleware';

describe('ProductValidationMiddleware', () => {
  it('should be defined', () => {
    expect(new ProductValidationMiddleware()).toBeDefined();
  });
});
