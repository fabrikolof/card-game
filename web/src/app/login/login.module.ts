import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    CoolSocialLoginButtonsModule,
    MatCardModule,
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
