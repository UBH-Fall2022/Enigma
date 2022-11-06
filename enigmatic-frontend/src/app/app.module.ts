import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DatasetpurchaseComponent } from './components/datasetpurchase/datasetpurchase.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DatasetpurchaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
