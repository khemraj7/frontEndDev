import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggredInUser: boolean = false

  constructor(private router: Router, public _session: SessionService, private api: ApiService) { }

  ngOnInit(): void {
    if (this._session.getUser()) {
      this.loggredInUser = true
    }
  }
  logout() {
    // localStorage.removeItem('user')
    console.log('logout', this._session.getToken())
    const token = this._session.getToken()
    // this._session.logout()
    // this.loggredInUser = !this.loggredInUser

    const body = {
      refreshToken: token.refresh.token
    }
    this.api.post("/auth/logout", body).subscribe(res => {
      console.log(res)
      this._session.logout()
      this.loggredInUser = !this.loggredInUser
    })

    console.log(body);

    // this.api.post("/auth/logout", body).subscribe(res => {
    //   console.log(res);
    //   this.router.navigate(['/profile'])
    // })
  }

}
