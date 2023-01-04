import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;





  constructor(private fb: FormBuilder,
    private api: ApiService,
    private router: Router, private session: SessionService) { }

  ngOnInit(): void {
    if (this.session.getUser()) {
      this.router.navigate(['/profile'])
    }
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]

      },

    );



  }


  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    const body = this.registerForm.value

    console.log(body, this.registerForm.value)

    this.api.post("/auth/register", body).subscribe(res => {
      console.log(res);
      this.session.loggedInUser(res.user, res.tokens)
      this.router.navigate(['/profile'])


    })


    // alert(
    //   'SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4)
    // );
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}

