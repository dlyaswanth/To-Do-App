import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  constructor(private toast:ToastrService,private router:Router,private httpClient:HttpClient) { }

  ngOnInit(): void {
  }
  cancel():void{
    this.router.navigateByUrl('/show-task').then();
  }
  addTask():void{
    let title=(<HTMLInputElement>document.getElementById('title')).value;
    let startDate=(<HTMLInputElement>document.getElementById('startdate')).value;
    let endDate=(<HTMLInputElement>document.getElementById('enddate')).value;
    let time=(<HTMLInputElement>document.getElementById('time')).value;
    console.log(time);
    if (title.length === 0 || startDate.length === 0 || endDate.length === 0 || time.length === 0)
    this.toast.error('Enter All fields');
    else
    {
      this.toast.info('Please Wait !');
      const headers={'content-type':'application/json'};
      const email=localStorage.getItem('todolist')?.toString().split(' ').pop()
      const body={"email":email,"title":title,"startDate":startDate,"endDate":endDate,"time":time};
      const url='create-task'
      this.httpClient.post(url,body,{'headers':headers})
      .subscribe(res=>{
        this.toast.success('Task Added Successfully');
        this.router.navigateByUrl('/show-task').then();
      })
    }
  }
}
