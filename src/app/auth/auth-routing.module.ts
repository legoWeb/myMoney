import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegirstrationComponent} from './registration/registration.component';
import {AuthComponent} from './auth.component';

const routes: Routes = [
  {path: '', component: AuthComponent, children: [
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegirstrationComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
