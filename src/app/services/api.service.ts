import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { switchMap, tap } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.apiUrl

  constructor(private http: HttpClient) {

  }
  get(url, query) {


  }
  post(url, body) {
    try {
      let headers = {}
      return this.http.post(this.baseUrl + url, body, { headers: headers }).pipe(
        tap(
          (response) => {
            return response
          },
          (err) => {
            return err
          }
        )
      )
    } catch (error) {
      return error;
    }
  }
  patch(url, body) {

  }

  delete(url) {

  }


}


