import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }

  signupUser(Usersignup:any){
    return this._http.post<{message:string,User:any}>(environment.baseUrlUser +'/Signup',Usersignup);
  }
  loginUser(Userlogin:any){
    return this._http.post<{message:string,user:any,token:string}>(environment.baseUrlUser +'/Login',Userlogin)
  }

  isLoggedin(){
    if(localStorage.getItem('token') === null){
      return false
    }else{
      return !!localStorage.getItem('token')
    }
  }
}
