import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-added-to-cart-modal',
  templateUrl: './added-to-cart-modal.component.html',
  styleUrls: ['./added-to-cart-modal.component.css']
})
export class AddedToCartModalComponent implements OnInit {
  
  lastItem = this.cartService.getLastItem();

  @Output()
  buttonClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    setTimeout(() => {  this.buttonClicked.emit(true); }, 1500);
  }

  closeCart() {
    this.buttonClicked.emit(true);
  }

}
