import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  items = [];
  constructor() {}

  addToFavourite(product) {
    this.items.push(product);
  }

  checkFavourites(product) {
    const index = this.items.indexOf(product);
    if (index > -1) {
      return true;
    }
    return false;
  }

  removeFavourite(product) {
    const index = this.items.indexOf(product);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  getItems() {
    return this.items;
  }

  clearFavourites() {
    this.items = [];
    return this.items;
  }
}
