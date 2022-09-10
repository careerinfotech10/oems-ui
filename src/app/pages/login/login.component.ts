import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/userServices/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private snack: MatSnackBar, private login: LoginService, private router: Router) { }
  loginData = {
    username: '',
    password: ''
  }
  ngOnInit(): void {

  }
  userLogin() {
    console.log(this.loginData);

    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open('Username is reqired !! ', '', { duration: 3000, verticalPosition: "top" });
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open('Passwod is reqired !! ', '', { duration: 3000, verticalPosition: 'top' });
      return;
    }

    // request to server to generate token

    this.login.generateToken(this.loginData).subscribe((data: any) => {
      console.log("success");
      console.log(data);

      // login
      this.login.loginUser(data.token);
      this.login.getCurrentUser().subscribe(

        (user: any) => {
          this.login.setUser(user);
          console.log('current user get', user);

          // redirect...ADMIN: admin-dashboard

          // redirect...NORMAL: normal-dashboard
          if (this.login.getUserRole() == 'ADMIN') {
            this.router.navigate(['/admin']);
            this.login.loginStatusSubject.next(true);
          } else if (this.login.getUserRole() == 'NORMAL') {
            this.router.navigate(['/user-dashboard/0']);
            this.login.loginStatusSubject.next(true);
          } else {
            this.login.logout();
          }
        }
      );

    }, (error) => {
      console.log("Error !");
      console.log(error);
      this.snack.open('Invalid Details !! Try again', '', {
        duration: 3000, verticalPosition: "top"
      })
    })



  }

}
