import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/userServices/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public login:LoginService, private router:Router) { }
isLoggedIn =false;
user:any=null;
  ngOnInit(): void {
    this.isLoggedIn=this.login.isLoggedIn();
    this.user=this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data)=>{
      this.isLoggedIn=this.login.isLoggedIn();
    this.user=this.login.getUser();
    })
  }

  public logOut(){
    this.login.logout();
    this.login.loginStatusSubject.next(false);
    this.router.navigate(['login']);
  }

}
