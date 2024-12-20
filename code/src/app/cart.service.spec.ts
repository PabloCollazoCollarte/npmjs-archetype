import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from './cart.service';
import { Product } from './products';

describe('CartService', () => {
  let service: CartService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService]
    });
    service = TestBed.inject(CartService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product to the cart', () => {
    const product: Product = { id: 1, name: 'Test Product', price: 100, description: 'Test Description' };
    service.addToCart(product);
    expect(service.getItems()).toContain(product);
  });

  it('should return items in the cart', () => {
    const product: Product = { id: 1, name: 'Test Product', price: 100, description: 'Test Description' };
    service.addToCart(product);
    const items = service.getItems();
    expect(items.length).toBe(1);
    expect(items[0]).toEqual(product);
  });

  it('should clear the cart', () => {
    const product: Product = { id: 1, name: 'Test Product', price: 100, description: 'Test Description' };
    service.addToCart(product);
    service.clearCart();
    expect(service.getItems().length).toBe(0);
  });

  it('should fetch shipping prices', () => {
    const mockShippingPrices = [
      { type: 'Overnight', price: 25.99 },
      { type: '2-Day', price: 9.99 }
    ];

    service.getShippingPrices().subscribe(prices => {
      expect(prices).toEqual(mockShippingPrices);
    });

    const req = httpTestingController.expectOne('/assets/shipping.json');
    expect(req.request.method).toEqual('GET');
    req.flush(mockShippingPrices);
  });
});
