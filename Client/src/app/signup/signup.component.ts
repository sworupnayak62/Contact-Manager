import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public user = new User('','','');
  public message! : string;
  public isError : boolean = false
  public isSuccess : boolean = false
  public isMatch : boolean = false

  constructor(private _userServices:UserService) { }

  ngOnInit(): void {
  }

  onSubmitForm(pass:string,confirm:string){
    if(pass!=confirm){
      this.isMatch = true
    }else{
      this.isMatch = false
      this._userServices.signupUser(this.user).subscribe(response=>{
        this.message = response.message
        this.isSuccess = true
        this.isError = false
      },err=>{
        this.message = err.error.message
        this.isSuccess = false
        this.isError = true
      })
    }
  }
}
