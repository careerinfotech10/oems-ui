import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServicesService } from 'src/app/userServices/user-services.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private addUserService: UserServicesService, private _snack:MatSnackBar) { }

  public user = {
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    phone:''
    // profile:''
  }

  formSubmit(){

    if (this.user.username == '' || this.user.username == null
     && this.user.password == '' ||this.user.password == null
     && this.user.firstname == '' ||this.user.firstname == null
     && this.user.lastname == '' ||this.user.lastname == null
     && this.user.phone == '' ||this.user.phone == null
     && this.user.email == '' ||this.user.email == null) {
      //  alert("welcome to Career Infotech exam");
      this._snack.open("Fill All Data","",{
        duration:2000,
        verticalPosition:"top",
      });
      return;
    } 
      // add User Service 
      this.addUserService.addUser(this.user).subscribe(
        (data:any)=>{
          // success
          console.log(data);
          // alert("Wel Come To Exam in Career Infotech");
          // this._snack.open("Wel Come To Exam in Career Infotech","",{
          //   duration:2000,
          //   verticalPosition:"top",
          // });
          Swal.fire('SuccessFully Done',' Wel Come To Career Infotech','success');
        },
        (Error)=>{
          this._snack.open("Somthing Is Worng","",{
            duration:2000,
            verticalPosition:"top",
          });

        }
        );
  }

  ngOnInit(): void {
  }

}
