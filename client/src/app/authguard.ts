import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
@Injectable()
export class authGuard implements CanActivate 
{
    constructor(private router:Router){}
    canActivate():boolean {
        if (localStorage.getItem('todolist'))
        return true;
        else
        {
            this.router.navigateByUrl('login').then();
            return false;
        }
    }
}