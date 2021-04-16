import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/serivce/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false]
    });
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  loginGoogle(): void {
    this.authService.GoogleAuth().then(() => console.log('Login Google'));
  }

  loginFacebook(): void {
    this.authService.FacebookAuth().then(() => console.log('Facebook Google'));
  }

  loginGithub(): void {
    this.authService.GitHubAuth().then(() => console.log('Github Google'));
  }

  loginTwitter(): void {
    this.authService.TwitterAuth().then(() => console.log('Login Google'));
  }
}
