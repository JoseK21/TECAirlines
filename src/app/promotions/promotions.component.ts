import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  airport = [];
  heroes = [];
  list_promotions = [];  //Default
  ptD: string = "Enter your point of departure ";
  ptA: string = "Enter your point of arrival";
  windowsSearch: boolean = true;
  destino: string = "";

  options: boolean = true; //Change to false
  enableSF: boolean = false;
  dateNOW: string;

  typeFlight: boolean = false; // false : Round Class - true : One way
  class3: boolean = false; // false : Bussiness Class - true : Economy Class

  // Variables to need load with info of Data Base
  ap_name = [];  //Default
  list_flights = [];  //Default
  list_cards = [];  //Default
  airportSelected: string = "";
  airportLoadApi: boolean = false;
  airportLoadCorrect: number = 0;

  msj: string = "";
  text: string = "";
  type: string = "";
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
  name: string = '';
  password: string = '';
  show_LI_SO: boolean = true; //Show Logn In : LO   
  message: string = "Hola Mundo!"
  wantAddCard: boolean = false; //CheckBox

  selectFlightID: string = "";
  selectUserName: string = "";
  selectPrice: number = 0;

  showTable: boolean = false;

  listCheck = [];
  username: string;
  userNAME: string;
  passWORD: string;
  modalMSG: number = -1;

  constructor(private service: ServiceService) {  }

  ngOnInit() {
    this.dateNOW = formatDate(new Date(), 'yyyy-MM-dd', 'en');    
  }

  /**
  * checkStudent Change condition Student 
  */
  public checkAddCard() {
    this.wantAddCard = !this.wantAddCard;
  }

  /**
   * addC
   */
  public addC(Ccn: string, Cvv: string, Ed: string) {
    if (Ccn.trim() == "" || Cvv.trim() == "" || Ed.trim() == "") {
      this.editAlert("Warning! ", "Empty inputs", "warning",1);
    } else {
      const json = { card_number: Ccn, exp_date: Ed, security_code: Cvv, username: this.userNAME, };
      this.service.addCard(json).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer); // Object to String
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr)); // String to Json
        if (jsonWEBAPI.http_result == 1) {
          this.editAlert("Success! ", jsonWEBAPI.msg, "success",1);
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Error! ", jsonWEBAPI.msg, "warning",1);
        } else {
          alert("ERROR DEL JSON.... home.componet");
        }
      });
    }
  }

  /**
   * pay
   */
  public pay(card: string, scode: string, Way: string, Class: string, Passengers: string, Date1) {
    if (card.trim() == "" || scode.trim() == "") {
      this.editAlert("Warning! ", "Empty inputs", "warning", 2);
    } else if (Date1 == 0) {
      this.editAlert("Warning! ", "Set the departure date", "warning", 2);
    }
    else {
      const json = { card_number: card, security_code: scode };
      console.log(JSON.parse(JSON.stringify(json)));      
      this.service.payFlight(json, this.userNAME).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer);
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
        console.log("Datos recibidos luego de pagar");      
        console.log(JSON.parse(userStr));
        if (jsonWEBAPI.http_result == 1) {
          this.reservation(Way, Class, Passengers);
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Error! ", jsonWEBAPI.msg, "warning", 2);
        } else {
          alert("ERROR DEL JSON.... home.componet");
        }
      });
    }
    this.modalMSG = 2;
  }

  /**
   * reservation
   */
  public reservation(Way: string, Class: string, Passengers: string) {
    if (Way.trim() == "" || Class.trim() == "") {
      this.editAlert("Warning! ", "Empty inputs", "warning", 2);
    } else {
      var way: string;
      var classs: boolean;
      if (Way == "Round Trip") {
        way = "Ida y Vuelta";
      } else {
        way = "Solo Ida";
      }
      if (Class == "Business Class") {
        classs = true;
      } else {
        classs = false;
      }
      const json = {
        flight_id: this.selectFlightID,
        type: way,
        is_first_class: classs,
        people_flying: Number(Passengers),
        username: this.userNAME
      };
      console.log("Datos para checkIn : ");
      console.log(JSON.parse(JSON.stringify(json)));      
      this.service.book(json).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer); // Object to String
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr)); // String to Json
        console.log("Datos luego del checkIn : "); 
        console.log(JSON.parse(userStr)); 
        if (jsonWEBAPI.http_result == 1) {
          this.editAlert("Success! ", jsonWEBAPI.msg, "success", 2);
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Error! ", jsonWEBAPI.msg, "warning", 2);
        } else {
          alert("ERROR DEL JSON.... home.componet");
        }
      });
    }
  }

  /**
   * logIn Login of a Customer
   * @param un UserName
   * @param pw Password
   */
  public logIn(un: string, pw: string) {
    if (un.trim() == "" || pw.trim() == "") {
      this.editAlert("Warning! ", "Empty inputs", "warning",0);
    } else {
      const json = { password: pw, username: un, };
      this.service.logInCustomer(json).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer);
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
        if (jsonWEBAPI.http_result == 1) {
          this.userNAME = un;
          this.passWORD = pw;
          this.isStudent(un);
        } else if (jsonWEBAPI.http_result == 0) {
          this.showTable = false;
          this.editAlert("Error! ", jsonWEBAPI.msg, "warning",0);
        } else {
          alert("ERROR DEL JSON.... home.componet");
        }
      });
    }
  }

  /**
   * isStudent
   */
  public isStudent(userName: string) {
    this.service.isStudent(userName).subscribe((jsonTransfer) => {
      const userStr = JSON.stringify(jsonTransfer);
      const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
      if (jsonWEBAPI.http_result == 1) {
        if (jsonWEBAPI.msg == "True") {
          this.modalMSG=-1;
          this.GetSales();
        } else {
          this.showTable = false;
          this.editAlert("Error! ", "Is not a Student", "warning",1);
        }
      } else if (jsonWEBAPI.http_result == 0) {
        this.showTable = false;
        this.editAlert("Error! ", jsonWEBAPI.msg, "warning",1);
      } else {
        alert("ERROR DEL JSON.... home.componet");
      }
    });
  }

  /**
   * GetSales
   */
  public GetSales() {
    this.service.GetSales().subscribe((jsonTransfer) => {
      const userStr = JSON.stringify(jsonTransfer);
      const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
      if (jsonWEBAPI.http_result == 1) {
        var array = JSON.parse("[" + jsonWEBAPI.sales + "]");
        console.log(array);
        
        this.list_promotions = array;
        this.showTable = true;
      } else if (jsonWEBAPI.http_result == 0) {
        this.showTable = false;
        this.editAlert("Error! ", jsonWEBAPI.msg, "warning",1);
      } else {
        alert("ERROR DEL JSON.... home.componet");
      }
    });
  }

  /**
   * sendData
   */
  public goToCheck(userName: string) {
    // this.changeModeShow();
    if (userName.trim().length == 0) {
      this.editAlert("Warning! ", "Empty input", "warning",1);
    } else {
      this.service.getListCheck(userName).subscribe((jsonTransfer) => {             //getListCheck(userName)
        const userStr = JSON.stringify(jsonTransfer);
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
        if (jsonWEBAPI.http_result == 1) {
          var array = JSON.parse("[" + jsonWEBAPI.flights + "]");
          if (array.length == 0) {
            this.editAlert("Sorry! ", "This user does't have reservations", "warning",1);
          } else {
            this.listCheck = array;
            this.showTable = true;
            this.username = userName;
          }
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Sorry! ", "This account doesn't have flight to check", "warning",1);
        } else {
          alert("ERROR DEL JSON.... home.componet");
        }
      });
    }
  }
  /**
   * checkFlight  */
  public checkFlight(checkID: string) {
    this.service.PreCheckCustomer(checkID, this.username).subscribe((jsonTransfer) => {             //getListCheck(userName)
      const userStr = JSON.stringify(jsonTransfer);
      const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
      if (jsonWEBAPI.http_result == 1) {
        var array = JSON.parse("[" + jsonWEBAPI.flights + "]");
        if (array.length == 0) {
          this.editAlert("Sorry! ", "This user does't have reservations", "warning",1);
        } else {
          this.listCheck = array;
          this.showTable = true;
        }
      } else if (jsonWEBAPI.http_result == 0) {
        this.editAlert("Sorry! ", "This account doesn't have flight to check", "warning",1);
      } else {
        alert("ERROR DEL JSON.... home.componet");
      }
    });
  }

  /**
   * getAirport
   */
  public getCard() {
    this.service.getListCards(this.userNAME).subscribe((jsonTransfer) => {
      const userStr = JSON.stringify(jsonTransfer);
      const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
      if (jsonWEBAPI.http_result == 1) {
        this.list_cards = jsonWEBAPI.cards;
      } else if (jsonWEBAPI.http_result == 0) {

      } else {
        alert("ERROR DEL JSON.... SEARCH.componet");
      }
    });
  }

  /**
   * editAlert
   */
  public editAlert(msg: string, text: string, type: string,num:number) {
    this.msj = msg;
    this.text = text;
    this.type = type;
    this.modalMSG=num;
  }
  /**
   * numModal
   * 0: pointDeparture
   * 1: pointArrival
   * charModal
   * 
   */
  public changeModal( selectedItem: any) { //CharModal: Input seleccionado
    this.selectFlightID = selectedItem.flight_id;    
    this.getCard();
  }
  /**
   * closeMessage
   */
  public closeMessage() {
    this.modalMSG=-1;
  }

  /**
   * closeMessage
   */
  public closeMessage_0() {
    this.modalMSG = -1;
  }

}
