import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RegistryComponent } from './registry/registry.component';
import { FlightsReservationComponent } from './flights-reservation/flights-reservation.component';
import { SearchFlightsComponent } from './search-flights/search-flights.component';

const routes: Routes = [
  // Inicio
  { path: '', component: MainComponent },
  // Error Page Not Found
  { path: 'errorPage', component: ErrorPageComponent },
  { path: 'registry', component: RegistryComponent },
  { path: 'flightsReservation', component: FlightsReservationComponent },
  { path: 'searchFlights', component: SearchFlightsComponent },
  
  { path: '**', pathMatch: 'full', redirectTo: 'pageNotFound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
