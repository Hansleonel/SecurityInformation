import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanedvisitComponent } from './planedvisit.component';

describe('PlanedvisitComponent', () => {
  let component: PlanedvisitComponent;
  let fixture: ComponentFixture<PlanedvisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanedvisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanedvisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
