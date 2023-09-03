import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  username: any = ''
  password: any = ''

  user: any = ''

  constructor(private router: Router,
    private appServiceService: AppServiceService,) { }

  signIn() {
    this.appServiceService.username$.next(this.username)
    this.appServiceService.password$.next(this.password)
    this.router.navigate(['home'])
  }

}
