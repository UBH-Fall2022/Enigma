import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DatasetpurchaseComponent } from './components/datasetpurchase/datasetpurchase.component';
import { CheckbalanceComponent } from './components/checkbalance/checkbalance.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DatasetpurchaseComponent,
    CheckbalanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
