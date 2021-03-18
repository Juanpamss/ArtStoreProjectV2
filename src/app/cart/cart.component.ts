import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items = this.cartService.getItems();
  totalPrice: number = 0;

  PriceReducer = (accumulator, currentValue) => accumulator.price + currentValue.price;

  @Output()
  buttonClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(  private cartService: CartService) { }

  ngOnInit(): void {
    this.calculateTotal()
  }

  calculateTotal() {
    this.items.forEach(item => {
      this.totalPrice +=item.price
    });
  }

  closeCart() {
    this.buttonClicked.emit(true);
  }

}
