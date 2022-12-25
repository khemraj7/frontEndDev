import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { switchMap, tap } from 'rxjs/operators'
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.apiUrl

  constructor(private http: HttpClient, private _session: SessionService) {

  }

  get(url, query) {
    try {

      const user = this._session.getUser()
      const token = this._session.getToken()

      const options = {
        // params: setparams,

        headers: {},
        params: query
      }
      if (user && user.email) {
        options.headers = {
          Authorization: user.email ? 'Bearer ' + token.access.token : null,
        }
      }
      return this.http.get(this.baseUrl + url, options).pipe(
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
      return error
    }

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
    try {
      const user = this._session.getUser()
      const token = this._session.getToken()

      let headers = {}
      if (user && user.email) {
        headers = {
          Authorization: user.email ? 'Bearer ' + token.access.token : null,
        }
      }
      return this.http.patch(this.baseUrl + url, body, { headers: headers }).pipe(
        tap(
          (response) => {
            return response
          },
          (err) => {
          }
        )
      )
    } catch (error) {
      return error;
    }
  }

  delete(url) {

  }


}


