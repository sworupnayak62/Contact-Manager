import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-after',
  templateUrl: './nav-after.component.html',
  styleUrls: ['./nav-after.component.css']
})
export class NavAfterComponent implements OnInit {
  public showname : string = "Welcome " + localStorage.getItem('UserName') + " !!"
  constructor(private router:Router ) { }

  ngOnInit(): void {
  }
  onLogout(){
    localStorage.removeItem('UserId')
    localStorage.removeItem('UserName')
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
  onAdd(){
    this.router.navigate(['/Contact/Add'])
  }

  onName(){
    this.router.navigate(['Contact/List'])
  }
}
