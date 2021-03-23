import {Component, OnInit} from '@angular/core';
import {Product} from './../models/product.model';
import {ActivatedRoute} from '@angular/router';
import {FilterModel} from "../models/filter.model";
import {ProductsService} from './../products.service';
import {CategoryService} from 'src/app/category.service';

import 'rxjs/add/operator/switchMap';
import {ArtPiece} from "../models/artPiece.model";
import {artapiService} from "../services/artapi.service";
import {SearchResultsModel} from "../models/SearchResults.model";

import * as data from './../../assets/category.json';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  categories = [];

  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = false;
  cartCount = 0;

  artPiecesToDisplay: ArtPiece[] = [];

  filtersData: any
  filters: FilterModel[]

  param1: string = "";

  selectedClassification = [];
  selectedPrice = [];

  totalCount = 0

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private _artapiService: artapiService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.param1 = this.route.snapshot.queryParamMap.get('userInput') !== null ? this.route.snapshot.queryParamMap.get('userInput') : ""

    this.categories = this.categoryService.getAll();
    let searchResults : SearchResultsModel[]

    let subscriber = this._artapiService.getSearchResults(this.param1);
    subscriber.subscribe(
      data => {
        this.totalCount = data['data'].length
        searchResults = data['data'].map(
          parseInfo => ({
            api_link: parseInfo.api_link,
            _score: parseInfo._score
          })
        )

        this._artapiService.getSearchData(false,searchResults)
        this.artPiecesToDisplay = this._artapiService.listArtPieces
        setTimeout(() => {  this.loading = false; }, 3500);
        //this.router.navigateByUrl('/products')
      },
      complete => {
      },
      () => {
      }
    )
 }

 reloadItemCount(cartCount) {
   this.cartCount = cartCount
 }
}
