import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../environments/environment';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _http: HttpClient) { }

  listAllContactsByUser(){
    return this._http.get<{message:string,ContactData:any}>(environment.baseUrlContact+"/"+localStorage.getItem('UserId'),{headers:new HttpHeaders().set('x-auth-token',localStorage.getItem('token')!)
  })
  }

  addContact(ContactData:any){
    return this._http.post<{message:string,ContactData:any}>(environment.baseUrlContact+"/save",ContactData,{headers:new HttpHeaders().set('x-auth-token',localStorage.getItem('token')!)
  })
  }

  deleteContact(id:string){
    return this._http.delete<{message:string}>(environment.baseUrlContact+"/Delete/"+id,{headers:new HttpHeaders().set('x-auth-token',localStorage.getItem('token')!)
  })
  }

  getContactById(id:string){
    return this._http.get<{message:string,ContactData:any}>(environment.baseUrlContact+"/Get/"+id,{headers:new HttpHeaders().set('x-auth-token',localStorage.getItem('token')!)
  })
  }

  updateContact(id:string,ContactData:any){
    return this._http.put<{message:string}>(environment.baseUrlContact+"/Update/"+id,ContactData,{headers:new HttpHeaders().set('x-auth-token',localStorage.getItem('token')!)
  })
  }
}
