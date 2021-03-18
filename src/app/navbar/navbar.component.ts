import { Component, OnInit } from '@angular/core';
import { artapiService } from '../services/artapi.service';
import { Router } from '@angular/router';
import { SearchResultsModel } from '../models/SearchResults.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  searchInput: string;

  searchResults: SearchResultsModel[];

  constructor(
    private _artapiService: artapiService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  closeResult: string;
  title = '';

  ngOnInit(): void {}

  getFormData(formData) {
    let userInput = formData.value.searchInput;

    this.redirectTo(userInput)
  }

  redirectTo(userInput) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/products'], {
        queryParams: {userInput: userInput}
      })
    )
  }

  openCart(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result; //.then((result) => {
  }

  openFavourite(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result; //.then((result) => {
  }

  closeFavourite(valueEmitted) {
    this.modalService.dismissAll();
  }

  closeShoppingCart(valueEmitted) {
    this.modalService.dismissAll();
  }
}
