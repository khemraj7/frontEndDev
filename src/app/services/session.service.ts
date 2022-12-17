import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {


  constructor(private router: Router) { }

  loggedInUser(user, token) {
    try {
      localStorage.setItem('token', JSON.stringify(token))
      localStorage.setItem('user', JSON.stringify(user))

    } catch (error) {
      return error;

    }
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.router.navigate([''])

  }


  getToken() {
    try {
      return JSON.parse(localStorage.getItem('token'))
    } catch (error) {
      return error;

    }
  }


  getUser() {
    try {
      return JSON.parse(localStorage.getItem('user'))
    } catch (error) {
      return error;

    }
  }
}
