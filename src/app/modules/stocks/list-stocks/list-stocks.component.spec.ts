import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStocksComponent } from './list-stocks.component';

describe('ListStocksComponent', () => {
  let component: ListStocksComponent;
  let fixture: ComponentFixture<ListStocksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListStocksComponent]
    });
    fixture = TestBed.createComponent(ListStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
