import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-addtask',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  constructor(private router:Router,private httpClient:HttpClient) { }
    date: string = '';
    MonthName:string = '';
    day:string='';
    year:string = '';
    task:any;
    ngOnInit(): void {
      function zeroPad(num:number , places:number )
      {
       return String(num).padStart(places, '0')
      }
      let dateTime =new Date();
      let Month=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug' ,'Sep','Oct','Nov','Dec']
      let days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      this.date=zeroPad(dateTime.getDate(),2);
      this.MonthName=Month[dateTime.getMonth()]
      this.year=dateTime.getFullYear().toString();
      this.day=days[dateTime.getDay()];
      const headers={'content-type':'application/json'};
      const email=localStorage.getItem('todolist')?.toString().split(' ').pop()
      const body={"email":email};
      const url='http://localhost:4201/show-task'
      this.httpClient.post(url,body,{'headers':headers})
      .subscribe(res=>{
        this.task=res;
      })
  }
  remove(id:number):void{
    const headers={'content-type':'application/json'};
    const email=localStorage.getItem('todolist')?.toString().split(' ').pop();
    const body={"email":email,"id":id};
    const url='http://localhost:4201/remove'
    this.httpClient.post(url,body,{'headers':headers})
    .subscribe(res=>{
      this.task=res;
    })
  }
  addtask():void {
    this.router.navigateByUrl('/create-task').then();
  }
  logout():void{
    localStorage.removeItem('todolist');
    this.router.navigateByUrl('/login').then();
  }
}
