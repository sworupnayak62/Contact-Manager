import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Contact } from '../contact';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public contact = new Contact('','','','','')
  public contactData : any[] = []
  public message! : string;
  public isError : boolean = false
  public isSuccess : boolean = false
  public contactId! : string;

  constructor(private _update: PostService,private _acroute: ActivatedRoute,private _router:Router) { }

  ngOnInit(): void {
    this._acroute.params.subscribe(param=>{
      this.contactId = param.id
    })
    this._update.getContactById(this.contactId).subscribe(response=>{
      this.contact.UserId = response.ContactData.UserId
      this.contact.ContactName = response.ContactData.ContactName
      this.contact.ContactEmail = response.ContactData.ContactEmail
      this.contact.ContactNumber = response.ContactData.ContactNumber
      this.contact.ContactType = response.ContactData.ContactType
    },err=>{
      console.log(err)
    })
  }

  onUpdateSubmit(){
    this._update.updateContact(this.contactId,this.contact).subscribe(response=>{
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
