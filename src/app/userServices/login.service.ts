import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  public loginStatusSubject = new Subject<boolean>();
  // Current User : which is Loggedin
  public getCurrentUser(){
    console.log('read service :: ');
    return this.http.get(`${baseUrl}/current-user`);
  }


  // Generate Token
  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  // login user set token in localStorage
  public loginUser(token:any){
    localStorage.setItem('token', token);
    return true;
  } 

  //islogin: user logged in or not

  public isLoggedIn(){
    let tokenStr=localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' ||tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  // logout :remove token from local storage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // get token 
  public getToken(){
    console.log('get Token',localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

  // set user Detail
  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  // getUser 
  public getUser(){
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout()
      return null;
    }
  }

  // get user role

  public getUserRole(){
    let user  = this.getUser();
    console.log('auth user data :: ', user);
    return user.authorities[0].authority;
  }

}
