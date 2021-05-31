import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CEIParser } from './components/CEIParser/CEIParser';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CEIParser,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
