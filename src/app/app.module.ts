import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { FlightsReservationComponent } from './flights-reservation/flights-reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SearchFlightsComponent,
    FlightsReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
