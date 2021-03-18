import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ArtPiece} from "../models/artPiece.model";
import {SearchResultsModel} from "../models/SearchResults.model";

@Injectable()
export class artapiService {

  constructor(private httpClient: HttpClient) {
  }

  searchResults: SearchResultsModel[]
  listArtPieces: ArtPiece[] = []

  getEmergingArt(): Observable<any> {

    let httpParams = new HttpParams()
      .set('api_key', "bwp3hsp254fah0gz29modmmr")
      .set('taxonomy_id', "75");

    /*let httpHeaders = new HttpHeaders()
      .set('accept', 'application/json')
      .set('X-Access-Token', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MDE3NTI5ZmRiNTUzNDAwMGUwNTQ3MjUiLCJzYWx0X2hhc2giOiJjMDI0NjY1NzMyNDhjODc1MTMxMjNiMGZiODdmNDkyYiIsInJvbGVzIjoidXNlciIsInBhcnRuZXJfaWRzIjpbXSwib3RwIjpmYWxzZSwiZXhwIjoyNDAyMTQ4OTIwLCJpYXQiOjE2MTMyMzA1MjAsImF1ZCI6IjUzZmYxYmNjNzc2ZjcyNDBkOTAwMDAwMCIsImlzcyI6IkdyYXZpdHkiLCJqdGkiOiI2MDI3ZjFiODIwOTMyYTAwMGY3ZmE0Y2YifQ.DnEtkMmu7SRjM7GkmH8jzY2qz96FgJ7r-8GR9noNEZs');*/

    return this.httpClient.get("https://api.artic.edu/api/v1/artworks?fields=id,title,artist_title,date_display,main_reference_number,image_id,classification_title,style_title")
  }

  getSearchResults(searchInput): Observable<any> {

    return this.httpClient.get("https://api.artic.edu/api/v1/artworks/search?limit=15&q=" + searchInput)

  }

  async getArtworkById(link): Promise<object> {

    return await this.httpClient.get(link).toPromise()
  }

  async getSearchData(searchResults) {

    this.listArtPieces.splice(0,this.listArtPieces.length)

    for (let i = 0; i < searchResults.length; i++) {
      await this.getArtworkById(searchResults[i].api_link).then(
        data => {
          this.listArtPieces.push(
            {
              id: data['data'].id,
              title: data['data'].title,
              date_display: data['data'].date_display,
              artist_title: data['data'].artist_title,
              imgURL: data['data'].image_id == null ? undefined : "https://www.artic.edu/iiif/2/" + data['data'].image_id + "/full/843,/0/default.jpg",
              price: parseFloat(data['data'].main_reference_number),
              style_title: data['data'].style_title,
              classification_title: data['data'].classification_title
            }
          )
        }
      )
    }
  }
}
