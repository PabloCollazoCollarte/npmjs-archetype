import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShippingComponent } from './shipping.component';
import { CartService } from '../cart.service';
import { of } from 'rxjs';

describe('ShippingComponent', () => {
  let component: ShippingComponent;
  let fixture: ComponentFixture<ShippingComponent>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['getShippingPrices']);

    await TestBed.configureTestingModule({
      declarations: [ShippingComponent],
      providers: [
        { provide: CartService, useValue: cartServiceSpy }
      ]
    }).compileComponents();

    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    cartService.getShippingPrices.and.returnValue(of([{ type: 'Overnight', price: 25.99 }]));

    fixture = TestBed.createComponent(ShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get shipping costs from the cart service', () => {
    component.shippingCosts.subscribe(costs => {
      expect(costs).toEqual([{ type: 'Overnight', price: 25.99 }]);
    });
  });
});
