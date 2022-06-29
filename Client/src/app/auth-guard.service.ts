import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private user:UserService,private _router:Router) { }

  canActivate(){
    if(!this.user.isLoggedin()){
      this._router.navigate(['/Login'])
      return false
    }
    return true
  }
}
