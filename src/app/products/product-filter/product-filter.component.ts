import {Component, Input, OnInit, ViewChildren} from '@angular/core';
import {artapiService} from "../../services/artapi.service";
import {ProductsComponent} from "../products.component";

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent implements OnInit {
  @Input('category') category;
  @ViewChildren('myItem') item;

  constructor(
    private _artPieceService : artapiService,
    private  _product : ProductsComponent
  ) {}

  ngOnInit(){}

  filteredArtPiecesList = []

  OnCheckboxSelect(option, event) {

    //console.log(this._product.artPiecesToDisplay)

    this.filteredArtPiecesList = []

    if (event.target.checked === true) {
      if(option.search("price-")<0){
        this._product.selectedClassification.push({option: option, checked: event.target.checked});
      }else{
        this._product.selectedPrice.push({option: option, checked: event.target.checked});
      }

    }
    if (event.target.checked === false) {
      if(option.search("price-")<0) {
        this._product.selectedClassification = this._product.selectedClassification.filter((item) => item.option !== option);
      }else{
        this._product.selectedPrice = this._product.selectedPrice.filter((item) => item.option !== option);
      }
    }

    if(this._product.selectedPrice.length === 0 && this._product.selectedClassification.length > 0){
      this._artPieceService.listArtPieces.forEach(data => {
        this._product.selectedClassification.forEach(busc => {
          if(data.classification_title.toLowerCase() === busc.option.toLowerCase()){
            this.filteredArtPiecesList.push(data)
          }
        })
      })
    }else if(this._product.selectedPrice.length > 0 && this._product.selectedClassification.length === 0){
      this._artPieceService.listArtPieces.forEach(data => {
        this._product.selectedPrice.forEach(busc => {
          let option = busc.option;
          var auxOption = option.replace("price-", "");
          if(parseFloat(auxOption) === 1000){
            if(data.price >= 0 && data.price <= parseFloat(auxOption)){
              this.filteredArtPiecesList.push(data)
            }
          }else if(parseFloat(auxOption) === 5000){
            if(data.price >= 1000 && data.price <= parseFloat(auxOption)){
              this.filteredArtPiecesList.push(data)
            }
          }else if(parseFloat(auxOption) === 10000){
            if(data.price >= 5000 && data.price <= parseFloat(auxOption)){
              this.filteredArtPiecesList.push(data)
            }
          }else if(parseFloat(auxOption) === 15000){
            if(data.price >= 10000 && data.price <= parseFloat(auxOption)){
              this.filteredArtPiecesList.push(data)
            }
          }
        })
      })
    }else{

      //Auxiliar list to filter art pieces by calssification and price
      let auxList = []
      this._artPieceService.listArtPieces.forEach(data => {
        this._product.selectedClassification.forEach(busc => {
          if(data.classification_title.toLowerCase() === busc.option.toLowerCase()){
            this.filteredArtPiecesList.push(data)
          }
        })
      })

      this.filteredArtPiecesList.forEach(data => {
        this._product.selectedPrice.forEach(busc => {
          let option = busc.option;
          var auxOption = option.replace("price-", "");
          if(parseFloat(auxOption) === 1000){
            if(data.price >= 0 && data.price <= parseFloat(auxOption)){
              auxList.push(data)
            }
          }else if(parseFloat(auxOption) === 5000){
            if(data.price >= 1000 && data.price <= parseFloat(auxOption)){
              auxList.push(data)
            }
          }else if(parseFloat(auxOption) === 10000){
            if(data.price >= 5000 && data.price <= parseFloat(auxOption)){
              auxList.push(data)
            }
          }else if(parseFloat(auxOption) === 15000){
            if(data.price >= 10000 && data.price <= parseFloat(auxOption)){
              auxList.push(data)
            }
          }
          this.filteredArtPiecesList = auxList
        })
      })
    }

    //console.log('Selected Ids ', this.selectedOptions)

    this._product.artPiecesToDisplay = this.filteredArtPiecesList

    if(this._product.selectedClassification.length === 0 && this._product.selectedPrice.length === 0){
      this._product.artPiecesToDisplay = this._artPieceService.listArtPieces
    }
  }
}
