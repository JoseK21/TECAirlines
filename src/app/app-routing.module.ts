import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  // Error Page Not Found
  { path: 'errorPage', component: ErrorPageComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'pageNotFound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
