import { FavouriteService } from '../favourite.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css'],
})
export class FavouriteComponent implements OnInit {
  items = [];
  constructor(private favouriteService: FavouriteService) {}
  @Output()
  buttonClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  ngOnInit(): void {
    this.items = this.favouriteService.getItems();
  }

  closeFavourite() {
    this.buttonClicked.emit(true);
  }

  clearFavourite() {
    this.favouriteService.clearFavourites();
    this.buttonClicked.emit(true);
  }
}
