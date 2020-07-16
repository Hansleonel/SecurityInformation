import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbargeneralComponent } from './navbargeneral.component';

describe('NavbargeneralComponent', () => {
  let component: NavbargeneralComponent;
  let fixture: ComponentFixture<NavbargeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbargeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbargeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
