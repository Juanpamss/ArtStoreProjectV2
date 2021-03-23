import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedToCartModalComponent } from './added-to-cart-modal.component';

describe('AddedToCartModalComponent', () => {
  let component: AddedToCartModalComponent;
  let fixture: ComponentFixture<AddedToCartModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedToCartModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedToCartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
