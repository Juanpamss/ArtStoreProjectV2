import { Component, Input, OnInit } from '@angular/core';
import { artapiService } from '../services/artapi.service';
import { Router } from '@angular/router';
import { SearchResultsModel } from '../models/SearchResults.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  @Input() cartCount;
  
  searchInput: string;

  searchResults: SearchResultsModel[];
  itemCount: Number;

  constructor(
    private _artapiService: artapiService,
    private router: Router,
    private modalService: NgbModal,
    private loginService: LoginService
  ) {}

  closeResult: string;
  title = '';
  userName = 'Login'
  ngOnInit(): void {
    this.userName = this.loginService.getUsername();
  }

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
