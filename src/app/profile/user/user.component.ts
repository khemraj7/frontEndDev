import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  username: any;
  updateName: any;
  updateEmail: any;
  editUser: boolean = false;
  constructor(private _session: SessionService) {
  }

  ngOnInit(): void {
    this.username = this._session.getUser();
    console.log(this._session.getUser());
    this.updateName = this.username.name;
    this.updateEmail = this.username.email



  }
  edit() {
    this.editUser = !this.editUser
  }
  update() {
    this.username.name = this.updateName
    this.username.email = this.updateEmail
    console.log(this.username)
    this._session.updateUser(this.username)
    this.editUser = !this.editUser

  }



}
