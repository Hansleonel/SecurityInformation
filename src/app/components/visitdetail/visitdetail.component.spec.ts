import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitdetailComponent } from './visitdetail.component';

describe('VisitdetailComponent', () => {
  let component: VisitdetailComponent;
  let fixture: ComponentFixture<VisitdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
