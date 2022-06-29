import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public message! : string;
  public isError : boolean = false
  public isSuccess : boolean = false
  public UserEmail! : string
  public UserPassword! : string

  constructor(private _userService: UserService,private _router:Router) { }

  ngOnInit(): void {
  }

  onLogin(){
    const loginInfo={
      UserEmail:this.UserEmail,
      UserPassword:this.UserPassword
    }
    this._userService.loginUser(loginInfo).subscribe(response=>{
      this.message = response.message
      this.isSuccess = true
      this.isError = false
      localStorage.setItem('token',response.token)
      localStorage.setItem('UserId',response.user.id)
      localStorage.setItem('UserName',response.user.name)
      this._router.navigate(['/Contact/List/'])
    },err=>{
      console.log(err)
      this.message = err.error.message
      this.isSuccess = false
      this.isError = true
    })
  }
}
