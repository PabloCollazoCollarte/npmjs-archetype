import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductListComponent } from './product-list.component';
import { ProductAlertsComponent } from '../product-alerts/product-alerts.component';
import { products } from '../products';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProductListComponent, ProductAlertsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have products', () => {
    expect(component.products).toEqual(products);
  });

  it('should alert when share is called', () => {
    spyOn(window, 'alert');
    component.share();
    expect(window.alert).toHaveBeenCalledWith('The product has been shared!');
  });
});
