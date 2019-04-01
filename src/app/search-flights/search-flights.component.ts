import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent implements OnInit {

  

  reservation:number=0;
  n:number=0;

  constructor() { }

  ngOnInit() {
  }

  
  public getNumReservation() {
    console.log("Number of reservation :"+this.reservation);
    return this.reservation;
  }

  public setNumReservation(num:number) {    
    this.reservation=num;
  }

  public checkHacker() {
    if(this.n == 0){
      this.n=1;
    }else{
      this.n=0;
    }
  }
}