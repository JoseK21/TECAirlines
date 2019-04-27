import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PassegerCheckComponent } from './passeger-check/passeger-check.component';
import { PromotionsComponent } from './promotions/promotions.component';

const routes: Routes = [
  { path: '', component: MainComponent },  
  { path: 'signUp', component: SignUpComponent },
  { path: 'checkIn', component: PassegerCheckComponent },
  { path: 'promotions', component: PromotionsComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'pageNotFound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
