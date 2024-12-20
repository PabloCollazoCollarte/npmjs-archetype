import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductDetailsComponent } from './product-details.component';
import { CartService } from '../cart.service';
import { Product } from '../products';
import { products } from '../products';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let cartService: jasmine.SpyObj<CartService>;
  let mockActivatedRoute;

  beforeEach(async () => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => '1'
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      providers: [
        { provide: CartService, useValue: cartServiceSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get the product from the route', () => {
    const product: Product = products.find(p => p.id === 1)!;
    expect(component.product).toEqual(product);
  });

  it('should add the product to the cart', () => {
    const product: Product = { id: 1, name: 'Test Product', price: 100, description: 'Test Description' };
    component.addToCart(product);
    expect(cartService.addToCart).toHaveBeenCalledWith(product);
  });
});
