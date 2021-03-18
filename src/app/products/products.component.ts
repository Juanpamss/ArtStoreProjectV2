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

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  categories = [];

  products: Product[] = [];
  filteredProducts: Product[] = [];


  artPiecesToDisplay: ArtPiece[] = [];

  filtersData: any
  filters: FilterModel[]

  param1: string = "";

  selectedClassification = [];
  selectedPrice = [];

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private _artapiService: artapiService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {

    this.param1 = this.route.snapshot.queryParamMap.get('userInput')

    if (this.param1 === "" || this.param1 === null) {
      this._artapiService.getEmergingArt().subscribe(
        data => {
          this.artPiecesToDisplay = data['data'].map(
            parseInfo => ({
              id: parseInfo.id,
              title: parseInfo.title,
              date_display: parseInfo.date_display,
              artist_title: parseInfo.artist_title,
              imgURL: parseInfo.image_id == null ? undefined : "https://www.artic.edu/iiif/2/" + parseInfo.image_id + "/full/843,/0/default.jpg",
              price: parseFloat(parseInfo.main_reference_number),
              style_title: parseInfo.style_title,
              classification_title: parseInfo.classification_title
            })
          )

          this._artapiService.listArtPieces = this.artPiecesToDisplay
        }
      )
    } else {

      let searchResults : SearchResultsModel[]

      let subscriber = this._artapiService.getSearchResults(this.param1);
      subscriber.subscribe(
        data => {
          searchResults = data['data'].map(
            parseInfo => ({
              api_link: parseInfo.api_link
            })
          )

          this._artapiService.getSearchData(searchResults)
          this.artPiecesToDisplay = this._artapiService.listArtPieces
          //this.router.navigateByUrl('/products')
        }
      )
      //this.artPiecesToDisplay = this._artapiService.listArtPieces
    }

    this.categories = this.categoryService.getAll();
 }
}
