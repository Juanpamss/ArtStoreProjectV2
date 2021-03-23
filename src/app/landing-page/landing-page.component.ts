import { Component, OnInit } from '@angular/core';
import {artapiService} from "../services/artapi.service";
import {ArtPiece} from "../models/artPiece.model";
import {Router} from '@angular/router';
import {get} from 'lodash';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(
    private _artapiService : artapiService,
    private router: Router,
  ) {}

  listArtPieces : ArtPiece[] = [];

  activeArtPiece : ArtPiece;

  dataInterval=true
  ngOnInit(){
    this._artapiService.getEmergingArt().subscribe(
      data => {
        this.listArtPieces = data['data'].map(
          parseInfo => ({
            id: parseInfo.id,
            title: parseInfo.title,
            date_display: parseInfo.date_display,
            artist_title: parseInfo.artist_title,
            imgURL: parseInfo.image_id == null ? undefined : "https://www.artic.edu/iiif/2/"+parseInfo.image_id+"/full/843,/0/default.jpg",
            price: parseFloat(parseInfo.main_reference_number),
            style_title: parseInfo.style_title,
            classification_title: parseInfo.classification_title
          })
        )

        //Remove artist with no URL images
        this.listArtPieces = this.listArtPieces.filter(
          item => item.imgURL !== undefined
        )
      }
    )
  }

  redirectTo(){
    this.router.navigate(['/products'])
  }

  stopAutoscroll(){
    this.dataInterval =false;
  }
}