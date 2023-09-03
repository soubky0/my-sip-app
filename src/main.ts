import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  import { Component } from '@angular/core';
  import { Router } from '@angular/router';
  
  @Component({
    selector: 'app-signin',
    templateUrl: './index.html',
  })
  export class SignInComponent {
    constructor(private router: Router) {}
  
    // Function to navigate to the 'home' route after form submission
    onSubmit() {
      // Perform form validation and processing here if needed
      
      // Navigate to the 'home' route
      this.router.navigate(['/home']);
    }
  }
  