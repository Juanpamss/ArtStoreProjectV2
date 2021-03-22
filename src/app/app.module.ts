import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsComponent } from './products/products.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductsService } from './products.service';
import { HttpClientModule } from '@angular/common/http';
import { artapiService } from './services/artapi.service';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import {FormsModule} from "@angular/forms";


/*NGRX*/
import {StoreModule} from "@ngrx/store";
import {counterReducer} from "./store/reducer";
import { FavouriteComponent } from './favourite/favourite.component';
import { LoginComponent } from './login/login.component';
import { AddedToCartModalComponent } from './added-to-cart-modal/added-to-cart-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductsComponent,
    LandingPageComponent,
    NavbarComponent,
    FooterComponent,
    CartComponent,
    FavouriteComponent,
    LoginComponent,
    AddedToCartModalComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    //RouterModule.forRoot([{ path: 'products', component: ProductsComponent }]),
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({ count: counterReducer })
  ],
  providers: [artapiService, ProductsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
