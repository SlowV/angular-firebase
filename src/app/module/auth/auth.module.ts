import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
import {AuthRoutingModule} from './auth-routing.module';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import {CoreModule} from '../../core/core.module';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [SignInComponent, ForgotPasswordComponent, VerifyEmailComponent, SignUpComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CoreModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
