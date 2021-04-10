import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from './../models/product.model';
import { ArtPiece } from '../models/artPiece.model';
import { CartService } from '../services/cart.service';
import { FavouriteService } from '../favourite.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Output() cartCount: EventEmitter<any> = new EventEmitter();

  @Input('ArtPiece') artPiece: ArtPiece;
  @Input('show-actions') showActions = true;

  inCart: boolean;

  toggle;
  itemCount: Number;
  constructor(
    private cartService: CartService,
    private favouriteService: FavouriteService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.isArtInCart()
  }
  isArtInCart() {
    this.inCart = false;
  }

  addToFavorites() {
    this.toggle = !this.toggle;
    if (this.toggle) {
      this.favouriteService.addToFavourite(this.artPiece);
    } else {
      this.favouriteService.removeFavourite(this.artPiece);
    }
  }

  addToCart(content) {
    this.inCart = true;
    this.cartService.addToCart(this.artPiece);
    this.itemCount= this.cartService.getCount();
    this.cartCount.emit(this.itemCount);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result//.then((result) => { 

      //})
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.artPiece);
    this.itemCount= this.cartService.getCount();
    this.cartCount.emit(this.itemCount);
    this.inCart = false;
  }

  closeAddedToCartModal() {
    this.modalService.dismissAll();
  }
 
}

