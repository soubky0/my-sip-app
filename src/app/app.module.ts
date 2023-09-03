import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Import your routing module

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    // Other components
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Add your routing module here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

