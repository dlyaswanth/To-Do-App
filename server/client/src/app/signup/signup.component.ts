import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private toastr:ToastrService,private httpClient:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }
  showToast():void{
    this.toastr.error('Enter all fields !');
  }
  login():void{
    this.router.navigateByUrl('/login').then();
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
      const headers={'content-type':'application/json'};
      const body={"email":email,"password":password};
      const signurl='http://localhost:4201/signup'
      this.httpClient.post(signurl,body,{'headers':headers})
      .subscribe(res=>{
        this.toastr.success('User Saved !');
        this.router.navigateByUrl('/login').then();
      },
        err=>{
          this.toastr.error('Email Already exists !');
        }
      )
    }
  }
}
