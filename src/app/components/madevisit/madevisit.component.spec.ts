import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MadevisitComponent } from './madevisit.component';

describe('MadevisitComponent', () => {
  let component: MadevisitComponent;
  let fixture: ComponentFixture<MadevisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MadevisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MadevisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
