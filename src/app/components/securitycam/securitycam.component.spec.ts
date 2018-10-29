import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritycamComponent } from './securitycam.component';

describe('SecuritycamComponent', () => {
  let component: SecuritycamComponent;
  let fixture: ComponentFixture<SecuritycamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecuritycamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuritycamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
