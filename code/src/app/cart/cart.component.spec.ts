import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart.component';
import { CartService } from '../cart.service';
import { Product } from '../products';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['getItems', 'clearCart']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CartComponent],
      providers: [
        { provide: CartService, useValue: cartServiceSpy }
      ]
    }).compileComponents();

    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    cartService.getItems.and.returnValue([{
      id: 1,
      name: 'Test Product',
      price: 100,
      description: 'Test Description'
    } as Product]);
    cartService.clearCart.and.returnValue([]);

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have items from the cart service', () => {
    expect(component.items.length).toBe(1);
    expect(component.items[0].name).toBe('Test Product');
  });

  it('should process the checkout form', () => {
    component.checkoutForm.setValue({ name: 'John Doe', address: '123 Main St' });
    component.onSubmit();

    expect(cartService.clearCart).toHaveBeenCalled();
    expect(component.items.length).toBe(0);
  });
});
