///<reference path="../../../node_modules/@angular/common/src/common_module.d.ts"/>
import {NgModule} from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegirstrationComponent } from './registration/registration.component';
import {AuthComponent} from './auth.component';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegirstrationComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule {}
