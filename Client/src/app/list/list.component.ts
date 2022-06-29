import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { Contact } from '../contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public contactData : any[] = []
  constructor(private _ps:PostService,private _router: Router) { }
  public contact = new Contact('','','','','')
  public isHide : boolean = true;
  public delContact = new Contact('','','','','')
  public id! : string


  ngOnInit(): void {
    this._ps.listAllContactsByUser().subscribe(response=>{
      this.contactData = response.ContactData
    },err=>{
      console.log(err)
    })
  }

  onDelete(_id:string,idx:any){
    this.isHide=false
    this.delContact = this.contactData[idx]
    this.id = _id
  }

  onConfirm(){
    this._ps.deleteContact(this.id).subscribe(response=>{
      this.isHide=true
      this._ps.listAllContactsByUser().subscribe(response=>{
        this.contactData = response.ContactData
      },err=>{
        console.log(err)
      })
    },err=>{
      console.log(err)
    })
  }

  onCancel(){
    this.isHide=true
  }
}
