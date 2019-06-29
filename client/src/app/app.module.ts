import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { GoogleFitService } from './services/google-fit.service';

@NgModule({
	declarations: [AppComponent, HomeComponent],
	providers: [GoogleFitService],
	imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
	bootstrap: [AppComponent]
})
export class AppModule {}
