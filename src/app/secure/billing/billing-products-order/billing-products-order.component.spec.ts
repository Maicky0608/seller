/* 3rd party components */
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

/* our own custom components */
import { BillingModule } from '../billing.module';
import { BillingProductsOrderComponent } from './billing-products-order.component';
import { MatSidenavModule } from '@angular/material';
import { ShellModule } from '@app/core/shell/shell.module';
import { By } from '@angular/platform-browser';
import { LoadingService } from '@app/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';


describe('BillingProductsOrderComponent', () => {
  let component: BillingProductsOrderComponent;
  let fixture: ComponentFixture<BillingProductsOrderComponent>;
  const mockLoadingService = jasmine.createSpyObj('LoadingService', ['viewSpinner', 'closeSpinner']);

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BillingModule,
        MatSidenavModule,
        ShellModule,
        TranslateModule.forRoot({})
      ],
      declarations: [
      ],
      providers: [
        { provide: LoadingService, useValue: mockLoadingService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingProductsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (done) => {
    expect(component).toBeTruthy();
    done();
  });

  describe('With order', () => {
    beforeEach(() => {
      component.order = [{
        detailName: 'Videojuego Grand Theft Auto V PS4',
        ean: 'MP02080000000035',
        quantity: '1',
        totalShippingCost: '2731',
        price: '104900'
      }];
    });

    it('open modal', (done) => {
      component.openModalDetailProduct(component.order);
      done();
    });


    it('exist products Information', (done) => {
      expect(component.order).not.toBeNull();
      done();
    });

    it('detail name product', (done) => {
      const detailproduct = fixture.debugElement.query(By.css('#detailName'));
      expect(detailproduct).toBeTruthy();
      const detailproductNative = detailproduct.nativeElement;
      detailproductNative.innerHTML = 'Videojuego Grand Theft Auto V PS4';
      fixture.detectChanges();
      expect(component.order.detailName).not.toBeNull();
      done();
    });

    it('ean product', (done) => {
      const ean = fixture.debugElement.query(By.css('#ean'));
      expect(ean).toBeTruthy();
      const eanNative = ean.nativeElement;
      eanNative.innerHTML = 'MP02080000000035';
      fixture.detectChanges();
      expect(component.order.ean).not.toBeNull();
      done();
    });

    it('quantity product', () => {
      const quantity = fixture.debugElement.query(By.css('#quantity'));
      expect(quantity).toBeTruthy();
      const quantityNative = quantity.nativeElement;
      quantityNative.innerHTML = '1';
      fixture.detectChanges();
      expect(component.order.quantity).not.toBeNull();
    });

    it('totalShippingCost product', (done) => {
      const totalShippingCost = fixture.debugElement.query(By.css('#totalShippingCost'));
      expect(totalShippingCost).toBeTruthy();
      const totalShippingCostNative = totalShippingCost.nativeElement;
      totalShippingCostNative.innerHTML = '2731';
      fixture.detectChanges();
      expect(component.order.totalShippingCost).not.toBeNull();
      done();
    });

    it('price product', () => {
      const price = fixture.debugElement.query(By.css('#price'));
      expect(price).toBeTruthy();
      const priceNative = price.nativeElement;
      priceNative.innerHTML = '104900';
      fixture.detectChanges();
      expect(component.order.price).not.toBeNull();
    });

  });

  describe('Without orders', () => {
    beforeEach(fakeAsync(() => {
      component.order = [{
        detailName: '',
        ean: '',
        quantity: '',
        totalShippingCost: '',
        price: ''
      }];
    }));

    it('exist products Information', (done) => {
      expect(component.order).not.toBeNull();
      done();
    });

    it('detail name product', (done) => {
      const detailproduct = fixture.debugElement.query(By.css('#detailName'));
      expect(detailproduct).toBeTruthy();
      const detailproductNative = detailproduct.nativeElement;
      detailproductNative.innerHTML = '';
      fixture.detectChanges();
      expect(component.order.detailName).toBeUndefined();
      done();
    });

    it('ean product', () => {
      const ean = fixture.debugElement.query(By.css('#ean'));
      expect(ean).toBeTruthy();
      const eanNative = ean.nativeElement;
      eanNative.innerHTML = '';
      fixture.detectChanges();
      expect(component.order.ean).toBeUndefined();
    });

    it('quantity product', () => {
      const quantity = fixture.debugElement.query(By.css('#quantity'));
      expect(quantity).toBeTruthy();
      const quantityNative = quantity.nativeElement;
      quantityNative.innerHTML = '';
      fixture.detectChanges();
      expect(component.order.quantity).toBeUndefined();
    });

    it('totalShippingCost product', (done) => {
      const totalShippingCost = fixture.debugElement.query(By.css('#totalShippingCost'));
      expect(totalShippingCost).toBeTruthy();
      const totalShippingCostNative = totalShippingCost.nativeElement;
      totalShippingCostNative.innerHTML = '';
      fixture.detectChanges();
      expect(component.order.totalShippingCost).toBeUndefined();
      done();
    });

    it('price product', (done) => {
      const price = fixture.debugElement.query(By.css('#price'));
      expect(price).toBeTruthy();
      const priceNative = price.nativeElement;
      priceNative.innerHTML = '';
      fixture.detectChanges();
      expect(component.order.price).toBeUndefined();
      done();
    });

  });

});

