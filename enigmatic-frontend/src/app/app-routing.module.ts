import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatasetpurchaseComponent } from './components/datasetpurchase/datasetpurchase.component';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'datasetpurchase', component: DatasetpurchaseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
