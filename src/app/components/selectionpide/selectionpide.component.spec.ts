import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionpideComponent } from './selectionpide.component';

describe('SelectionpideComponent', () => {
  let component: SelectionpideComponent;
  let fixture: ComponentFixture<SelectionpideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionpideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionpideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
