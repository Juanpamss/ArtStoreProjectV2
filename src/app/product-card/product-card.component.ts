import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from './../models/product.model';
import { ArtPiece } from '../models/artPiece.model';
import { CartService } from '../services/cart.service';
import { FavouriteService } from '../favourite.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input('ArtPiece') artPiece: ArtPiece;
  @Input('show-actions') showActions = true;
  toggle;
  constructor(
    private cartService: CartService,
    private favouriteService: FavouriteService
  ) {}

  ngOnInit(): void {}

  addToFavorites() {
    this.toggle = !this.toggle;
    if (this.toggle) {
      this.favouriteService.addToFavourite(this.artPiece);
    } else {
      this.favouriteService.removeFavourite(this.artPiece);
    }
  }

  addToCart() {
    this.cartService.addToCart(this.artPiece);
    window.alert('Your product has been added to the cart!');
  }
}
