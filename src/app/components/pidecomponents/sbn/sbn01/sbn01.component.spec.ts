import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sbn01Component } from './sbn01.component';

describe('Sbn01Component', () => {
  let component: Sbn01Component;
  let fixture: ComponentFixture<Sbn01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sbn01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sbn01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
