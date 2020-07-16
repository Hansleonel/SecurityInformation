import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchmovimientoComponent } from './searchmovimiento.component';

describe('SearchmovimientoComponent', () => {
  let component: SearchmovimientoComponent;
  let fixture: ComponentFixture<SearchmovimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchmovimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchmovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
