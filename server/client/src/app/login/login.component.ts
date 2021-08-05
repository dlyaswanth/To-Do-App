import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private toastr: ToastrService,private httpClient: HttpClient,private router:Router){

  }
  ngOnInit(): void {
  }
  showToast():void{
    this.toastr.error('Enter all fields !');
  }
  createAccount():void{
    this.router.navigateByUrl('/signup').then();
  }
  signHandler():void{
    let email=(<HTMLInputElement>document.getElementById('email')).value;
    let password=(<HTMLInputElement>document.getElementById('password')).value;
    if (email.length ===0 || password.length ===0)
    {
      this.showToast();
    }
    else
    {
      this.toastr.info('Please Wait !');
      const headers={'content-type':'application/json'};
      const body={"email":email,"password":password};
      const signurl='login'
      this.httpClient.post(signurl,body,{'headers':headers})
      .subscribe(res=>{
        localStorage.setItem('todolist',"logged In with email: "+email);
        this.toastr.success('Logged In Successfully !');
        this.router.navigateByUrl('/show-task').then();
      },
        err=>{
          this.toastr.error('Invalid Email or Password !');
        }
      )
    }
  }
}
