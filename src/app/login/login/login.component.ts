import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
  FacebookLoginProvider,
} from 'angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  private formSubmitAttempt: boolean;
  userData: SocialUser;
  booleanData: boolean =false;
  userSocialData: SocialUser;
  facebookBooleanData: boolean;

  constructor(
    private fb: FormBuilder, private api: ApiService,
    private session: SessionService,
    private router: Router,
    private socialAuthService: SocialAuthService
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

    this.socialAuthService.authState.subscribe((user)=>{
      console.log(user)
      this.userData = user
    })

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

  signWithGoogle(){
    try {
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(result=>{
        console.log(result)
        this.booleanData = true
        this.userSocialData = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  signOut(){
    this.socialAuthService.signOut()
    this.booleanData = false

  }

  loginWithFacebook(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(result=>{
      console.log(result)
      this.facebookBooleanData = true
      this.userSocialData = result
    })
  }

  fbsignOut(){
    this.socialAuthService.signOut()
    this.facebookBooleanData = false

  }
}
