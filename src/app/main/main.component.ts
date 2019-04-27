import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  from: string = "Enter your point of departure ";
  to: string = "Enter your point of arrival";
  showActions: boolean = true; 
  varAlert: boolean = false;

  // News variables

  //Images
  title: string = "";
  description:string="";

  //Search
  ptD:string="Enter your point of departure ";
  ptA:string="Enter your point of arrival";
  dD:string="";
  dR:string="";

  //Type flight
  rToW:boolean=true;
  bCeC:boolean=true;
  eDfD:boolean=true;
  
  //acountPasagger
  adult:number=0;
  children:number=0;
  infants:number=0;

  /**
   * get_ptD
   * Obtiene el punto de partida seleccioando
   */
  public get_ptD() {
    return this.ptD;
  }
  /**
   * setptD
   * Selecciona el punto de partida 
   */
  public setptD(input:string) {
    this.ptD=input;
  }

  /**
   * get_ptA
   * Obtiene el punto de llegada seleccioando
   */
  public get_ptA() {
    return this.ptA;
  }
  /**
   * setptA
   * Selecciona el punto de llegada 
   */
  public setptA(input:string) {
    this.ptA=input;
  }

  /**
   * get_dD
   * Obtiene la fecha de salida 
   */
  public get_dD() {
    return this.dD;
  }
  /**
   * setdD
   * Selecciona la fecha de salida 
   */
  public setdD(input:string) {
    this.dD=input;
  }

  /**
   * get_dR
   * Obtiene la fecha de salida 
   */
  public get_dR() {
    return this.dR;
  }
  /**
   * setdR
   * Selecciona la fecha de salida 
   */
  public setdR(input:string) {
    this.dR=input;
  }

  constructor() { }

  ngOnInit() {
  }

}
