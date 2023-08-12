import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksReportsTableComponent } from './stocks-reports-table.component';

describe('StocksReportsTableComponent', () => {
  let component: StocksReportsTableComponent;
  let fixture: ComponentFixture<StocksReportsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StocksReportsTableComponent]
    });
    fixture = TestBed.createComponent(StocksReportsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
