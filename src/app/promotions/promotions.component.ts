import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  airport = [];
  heroes = [];
  ptD: string = "Enter your point of departure ";
  ptA: string = "Enter your point of arrival";
  windowsSearch: boolean = true;
  showModal: number = 0;
  point: number = 0;
  destino: string = "";

  options: boolean = true; //Change to false
  enableSF: boolean = false;
  dateNOW: string;

  typeFlight: boolean = false; // false : Round Class - true : One way
  class3: boolean = false; // false : Bussiness Class - true : Economy Class

  // Variables to need load with info of Data Base
  ap_name = [];  //Default
  list_flights = [];  //Default
  list_cards= [];  //Default
  airportSelected: string = "";
  airportLoadApi: boolean = false;
  airportLoadCorrect: number = 0;

  msj: string = "";
  text: string = "";
  type: string = "";
  showMessage: boolean = false;
  showMessageErrorLogin: boolean = false;
  msjAPI: string = "";

  //Variables to send in Reservation
  s_flight_Id: string = "";
  s_type: string = "";
  s_is_first_class: boolean = false;
  s_people_flying: number = 0;
  s_username: string = "";

  //RESERVATION
  userCheck: boolean = false;
  userName: string = "";
  registry: boolean = false;
  name: string = '';
  password: string = '';
  show_LI_SO: boolean = true; //Show Logn In : LO   
  message: string = "Hola Mundo!"
  modalMSG: number = -1;
  wantAddCard: boolean = false; //CheckBox

  selectFlightID: string = "";
  selectUserName: string = "";
  selectPrice: number = 0;

  showTable: boolean = false;

  listCheck = [];
  username:string;

  constructor(private service: ServiceService) { }

  ngOnInit() {
  }

  /**
   * logIn Login of a Customer
   * @param un UserName
   * @param pw Password
   */
  public logIn(un: string, pw: string) {
    if (un.trim() == "" || pw.trim() == "") {
      this.editAlert("Warning! ", "Empty inputs", "warning", 1);
      this.modalMSG = 0;
    } else {
      const json = { password: pw, username: un, };
      this.service.logInCustomer(json).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer);
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
        if (jsonWEBAPI.http_result == 1) {
          this.registry = true;
          this.name = un;
          this.userCheck = true;
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Error! ", jsonWEBAPI.msg, "warning", 1);
          this.modalMSG = 0;
        } else {
          alert("ERROR DEL JSON.... home.componet");
        }
      });
    }
  }

  /**
   * sendData
   */
  public goToCheck(userName: string) {
   // this.changeModeShow();
    if (userName.trim().length == 0) {
      this.editAlert("Warning! ", "Empty input", "warning",2);
    } else {
      this.service.getListCheck(userName).subscribe((jsonTransfer) => {             //getListCheck(userName)
        const userStr = JSON.stringify(jsonTransfer);
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
        if (jsonWEBAPI.http_result == 1) {
          var array = JSON.parse("[" + jsonWEBAPI.flights + "]");
          if (array.length == 0) {
            this.editAlert("Sorry! ", "This user does't have reservations", "warning",2);
          } else {
            this.listCheck = array;
            this.showTable = true;   
            this.username=userName;
          }
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Sorry! ", "This account doesn't have flight to check", "warning",2);
        } else {
          alert("ERROR DEL JSON.... home.componet");
        }
      });      
    }
  }
  /**
   * checkFlight  */
  public checkFlight(checkID:string) {    
      this.service.PreCheckCustomer(checkID,this.username).subscribe((jsonTransfer) => {             //getListCheck(userName)
        const userStr = JSON.stringify(jsonTransfer);
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
        if (jsonWEBAPI.http_result == 1) {
          var array = JSON.parse("[" + jsonWEBAPI.flights + "]");
          if (array.length == 0) {
            this.editAlert("Sorry! ", "This user does't have reservations", "warning",2);
          } else {
            this.listCheck = array;
            this.showTable = true;             }
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Sorry! ", "This account doesn't have flight to check", "warning",2);
        } else {
          alert("ERROR DEL JSON.... home.componet");
        }
      });
  }

  /**
   * editAlert
   */
  public editAlert(msg: string, text: string, type: string, numAlert: number) {
    this.msj = msg;
    this.text = text;
    this.type = type;
    if (numAlert == 1) {
      this.showMessageErrorLogin = true;
      this.showMessage = false;
    } else if (numAlert == 2) {
      this.showMessageErrorLogin = false;
      this.showMessage = true;
    }
    
  }

  /**
   * closeMessage
   */
  public closeMessage_0() {
    this.modalMSG = -1;
  }

  /**
   * closeMessage
   */
  public closeMessage() {
    this.showMessage = false;
  }

}
