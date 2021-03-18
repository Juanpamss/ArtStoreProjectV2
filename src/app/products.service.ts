import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // products: any = [];
  constructor(private httpClient: HttpClient) {
    // this.httpClient.get('assets/products.json').subscribe((data) => {
    //   console.log(data);
    //   this.products = data;
    // });
  }
  ngOnInit() {}

  fetchData(): Observable<Product[]> {
    return this.httpClient
      .get('assets/products.json')
      .map((response) => <Product[]>response);
  }
}
