import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoductCategoryMenuComponent } from './poduct-category-menu.component';

describe('PoductCategoryMenuComponent', () => {
  let component: PoductCategoryMenuComponent;
  let fixture: ComponentFixture<PoductCategoryMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoductCategoryMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoductCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
