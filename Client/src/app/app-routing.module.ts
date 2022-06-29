import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SignupComponent } from './signup/signup.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"Login",component:LoginComponent},
  {path:"Signup",component:SignupComponent},
  {path:"Contact/List",component:ListComponent,canActivate:[AuthGuardService]},
  {path:"Contact/Add",component:AddComponent,canActivate:[AuthGuardService]},
  {path:"Contact/Update/:id",component:EditComponent,canActivate:[AuthGuardService]},
  {path:"**",component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
