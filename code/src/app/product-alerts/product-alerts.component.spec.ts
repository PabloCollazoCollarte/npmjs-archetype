import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductAlertsComponent } from './product-alerts.component';
import { Product } from '../products';

describe('ProductAlertsComponent', () => {
  let component: ProductAlertsComponent;
  let fixture: ComponentFixture<ProductAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductAlertsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an input product', () => {
    const product: Product = { id: 1, name: 'Test Product', price: 100, description: 'Test Description' };
    component.product = product;
    fixture.detectChanges();
    expect(component.product).toEqual(product);
  });

  it('should emit notify event when notify method is called', () => {
    spyOn(component.notify, 'emit');

    component.notify.emit();
    expect(component.notify.emit).toHaveBeenCalled();
  });
});
