import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientopersonaldetailComponent } from './movimientopersonaldetail.component';

describe('MovimientopersonaldetailComponent', () => {
  let component: MovimientopersonaldetailComponent;
  let fixture: ComponentFixture<MovimientopersonaldetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientopersonaldetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientopersonaldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
