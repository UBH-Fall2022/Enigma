import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckbalanceComponent } from './components/checkbalance/checkbalance.component';
import { DatasetpurchaseComponent } from './components/datasetpurchase/datasetpurchase.component';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'datasetpurchase', component: DatasetpurchaseComponent },
  { path: 'checkbalance', component: CheckbalanceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
