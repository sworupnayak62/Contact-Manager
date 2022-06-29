import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Contact } from '../contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public contact = new Contact('','','','','')
  public message! : string;
  public isError : boolean = false
  public isSuccess : boolean = false
  
  constructor(private _add: PostService,private _router: Router) { }

  ngOnInit(): void {
  }
   
  onAdd(){
    this.contact.UserId = localStorage.getItem('UserId')
    this._add.addContact(this.contact).subscribe(response=>{
      this.message = response.message
      this.isSuccess = true
      this.isError = false
      this._router.navigate(['/Contact/List'])
    },err=>{
      this.message = err.error.message
      this.isSuccess = false
      this.isError = true
    })
  }
  onCancel(){
    this._router.navigate(['/Contact/List'])
  }
}
