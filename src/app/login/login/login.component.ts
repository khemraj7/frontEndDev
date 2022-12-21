import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder, private api: ApiService,
    private session: SessionService,
    private router: Router
    // private authService: AuthService
  ) { }

  ngOnInit() {
    console.log(this.session.getUser());

    if (this.session.getUser()) {

      this.router.navigate(['/profile'])

    }
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    console.log(this.form.value);
    const body = this.form.value;

    this.api.post("/auth/login", body).subscribe(res => {
      console.log(res);
      this.session.loggedInUser(res.user, res.tokens)
      this.router.navigate(['/profile'])

    })
    // if (this.form.valid) {
    //   this.login(this.form.value);
    // }
    this.formSubmitAttempt = true;
  }
}
