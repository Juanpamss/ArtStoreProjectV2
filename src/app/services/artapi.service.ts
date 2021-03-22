import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ArtPiece} from "../models/artPiece.model";
import {SearchResultsModel} from "../models/SearchResults.model";
import * as data from './../../assets/category.json';

@Injectable()
export class artapiService {

  constructor(private httpClient: HttpClient) {
  }

  categoryFilter: any = (data as any).default;

  searchResults: SearchResultsModel[]
  listArtPieces: ArtPiece[] = []

  emergingArtPieces: ArtPiece[] = []

  getEmergingArt(): Observable<any> {

    /*let httpParams = new HttpParams()
      .set('api_key', "bwp3hsp254fah0gz29modmmr")
      .set('taxonomy_id', "75");*/

    /*let httpHeaders = new HttpHeaders()
      .set('accept', 'application/json')
      .set('X-Access-Token', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MDE3NTI5ZmRiNTUzNDAwMGUwNTQ3MjUiLCJzYWx0X2hhc2giOiJjMDI0NjY1NzMyNDhjODc1MTMxMjNiMGZiODdmNDkyYiIsInJvbGVzIjoidXNlciIsInBhcnRuZXJfaWRzIjpbXSwib3RwIjpmYWxzZSwiZXhwIjoyNDAyMTQ4OTIwLCJpYXQiOjE2MTMyMzA1MjAsImF1ZCI6IjUzZmYxYmNjNzc2ZjcyNDBkOTAwMDAwMCIsImlzcyI6IkdyYXZpdHkiLCJqdGkiOiI2MDI3ZjFiODIwOTMyYTAwMGY3ZmE0Y2YifQ.DnEtkMmu7SRjM7GkmH8jzY2qz96FgJ7r-8GR9noNEZs');*/

    return this.httpClient.get("https://api.artic.edu/api/v1/artworks?fields=id,title,artist_title,date_display,main_reference_number,image_id,classification_title,style_title")
  }

  getSearchResults(searchInput): Observable<any> {

    let encodedInput = encodeURI('"'+searchInput+'"')

    return this.httpClient.get("https://api.artic.edu/api/v1/artworks/search?params=%7B%22limit%22%3A%20%2215%22%2C%22query%22%3A%20%7B%22terms%22%3A%20%7B%22classification_id%22%3A%5B%22TM-9%22%2C%22TM-13%22%2C%22TM-66%22%2C%22TM-2211%22%2C%22TM-80%22%2C%22TM-12%22%2C%22TM-39%22%5D%7D%7D%2C%22q%22%3A" + encodedInput + "%7D")

  }

  async getArtworkById(link): Promise<object> {

    return await this.httpClient.get(link).toPromise()
  }

  async getSearchData(isLanding, searchResults) {

    this.listArtPieces.splice(0,this.listArtPieces.length)
    this.emergingArtPieces.splice(0,this.listArtPieces.length)

    for (let i = 0; i < searchResults.length; i++) {
      await this.getArtworkById(searchResults[i].api_link).then(
        data => {

          if(isLanding){
            this.emergingArtPieces.push(
              {
                id: data['data'].id,
                title: data['data'].title,
                date_display: data['data'].date_display,
                artist_title: data['data'].artist_title,
                imgURL: data['data'].image_id == null ? undefined : "https://www.artic.edu/iiif/2/" + data['data'].image_id + "/full/843,/0/default.jpg",
                price: searchResults[i]._score*10,
                style_title: data['data'].style_title,
                classification_title: data['data'].classification_title
              }
            )
          }else{
            this.listArtPieces.push(
              {
                id: data['data'].id,
                title: data['data'].title,
                date_display: data['data'].date_display,
                artist_title: data['data'].artist_title,
                imgURL: data['data'].image_id == null ? undefined : "https://www.artic.edu/iiif/2/" + data['data'].image_id + "/full/843,/0/default.jpg",
                price: searchResults[i]._score*10,
                style_title: data['data'].style_title,
                classification_title: data['data'].classification_title
              }
            )
          }
        }
      )
    }

    let auxList = []

    this.listArtPieces.forEach(
      data => {
        auxList.push(data.classification_title)
      }
    )
    let disabledList = []

    this.categoryFilter[0].options.forEach(
      data => {
        if(auxList.indexOf(data.toLowerCase()) < 0){
          disabledList.push(data)
        }
      }
    )

    this.disableFilters(disabledList)
  }

  disableFilters(list){
    list.forEach(
      id => {
        var element = <HTMLInputElement> document.getElementById(id)
        element.disabled = true
      }
    )
  }
}
