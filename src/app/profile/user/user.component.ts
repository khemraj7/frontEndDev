import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
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
  constructor(private _session: SessionService, private api: ApiService) {
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
    // this.username.email = this.updateEmail
    console.log(this.username)
    const body = {
      name: this.updateName
    }
    this.api.patch(`/users/updateUser/${this.username.id}`, body).subscribe((res) => {
      console.log(res);
      this._session.updateUser(res)
      this.editUser = !this.editUser

    })

  }


  getUserById() {
    const query = {};
    const user = this._session.getUser()
    console.log(user);

    this.api.get(`/users/getUsers/${user.id}`, query).subscribe((res) => {
      console.log(res);

    })
  }



}
