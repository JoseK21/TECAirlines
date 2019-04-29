import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

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
  list_cards = [];  //Default
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

  milesActive: boolean = false;
  constructor(private service: ServiceService) { }

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
   * changeAcount
   */
  public changeAcount() {
    this.userCheck = false;
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
          this.getCard();
          this.isStudent(un);
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
   * isStudent
   */
  public isStudent(userName: string) {
    this.service.isStudent(userName).subscribe((jsonTransfer) => {
      const userStr = JSON.stringify(jsonTransfer);
      const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
      if (jsonWEBAPI.http_result == 1) {
        if (jsonWEBAPI.msg == "True") {
          this.milesActive = true;
        } else {
          this.milesActive = false;
        }
      } else if (jsonWEBAPI.http_result == 0) {
        this.milesActive = false;
      }
    });
  }

  /**
   * addC
   */
  public addC(Ccn: string, Cvv: string, Ed: string) {
    if (Ccn.trim() == "" || Cvv.trim() == "" || Ed.trim() == "") {
      this.editAlert("Warning! ", "Empty inputs", "warning", 1);
    } else {
      const json = { card_number: Ccn, exp_date: Ed, security_code: Cvv, username: this.name, };
      console.log(JSON.stringify(json));
      
      this.service.addCard(json).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer); // Object to String
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr)); // String to Json
        if (jsonWEBAPI.http_result == 1) {
          this.registry = true;
          this.userCheck = true;
          this.editAlert("Success! ", jsonWEBAPI.msg, "success", 1);
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Error! ", jsonWEBAPI.msg, "warning", 1);
        } else {
          alert("ERROR DEL JSON.... home.componet");
        }
      });
    }
    this.modalMSG = 1;
    // this.showMessage = true;
  }

  /**
   * reservation
   */
  public reservation(Way: string, Class: string, Passengers: string) {
    if (Way.trim() == "" || Class.trim() == "") {
      this.editAlert("Warning! ", "Empty inputs", "warning", 1);
      this.modalMSG = 3;
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
        username: this.name
      };
      this.service.book(json).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer); // Object to String
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr)); // String to Json
        if (jsonWEBAPI.http_result == 1) {
          this.editAlert("Success! ", jsonWEBAPI.msg, "success", 1);
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Error! ", jsonWEBAPI.msg, "warning", 1);
        } else {
          alert("ERROR DEL JSON.... home.componet");
        }
      });
    }
  }

  /**
   * pay
   */
  public pay(card: string, scode: string, Way: string, Class: string, Passengers: string, payMiles: string) {
    alert(payMiles)
    if (card.trim() == "" || scode.trim() == "") {
      this.editAlert("Warning! ", "Empty inputs", "warning", 1);
    }
    else {
      var payM = 0;
      if (payMiles == "Yes") {
        payM = 1;
      }
      const json = { card_number: card, security_code: scode, pay_miles: payM };
      console.log(JSON.parse(JSON.stringify(json)));

      alert("Username: " + this.name + " Flight ID: " + this.selectFlightID);

      this.service.payFlight(json, this.name, this.selectFlightID).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer);
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
        if (jsonWEBAPI.http_result == 1) {
          this.reservation(Way, Class, Passengers);
          // this.editAlert("Success! ", jsonWEBAPI.msg, "success", 1); Esta no porque se debe mostrar que si se realizo el pago o no
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Error! ", jsonWEBAPI.msg, "warning", 1);
        } else {
          alert("ERROR DEL JSON.... home.componet");
        }
      });
    }
    this.modalMSG = 2;
  }
  /**
   * getAirport
   */
  public getAirport() {
    if (!this.airportLoadApi) {
      this.airportLoadApi = true;
      this.service.getAirports().subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer); // Object to String
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr)); // String to Json       
        if (jsonWEBAPI.http_result == 1) {
          this.airportLoadApi = false; // Lista cargada
          this.ap_name = jsonWEBAPI.airports;
        } else if (jsonWEBAPI.http_result == 0) {
          this.airportLoadApi = true; // Lista no cargada : no se retorno del web api
        } else {
          alert("ERROR DEL JSON.... SEARCH.componet");
        }
      });
    }
  }

  /**
   * getAirport
   */
  public getCard() {
    this.service.getListCards(this.name).subscribe((jsonTransfer) => {
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
  * setAirport
  */
  public setAirport(airport: string) {
    this.airportSelected = airport;
    this.ptD = airport;
  }

  /**
   * changeWindows
   */
  public changeWindows() {
    this.windowsSearch = true;
    this.ptD = "Enter your point of departure ";
    this.ptA = "Enter your point of arrival";
    this.enableSF = false;
    this.typeFlight = false;
    this.class3 = false;
  }

  /**
   * sendData
   */
  public sendData() {
    this.destino = this.ptD + " to " + this.ptA;
    this.heroes = [];
    const json = { depart_ap: this.ptD, arrival_ap: this.ptA };
    this.service.getFlightsByInputs(json).subscribe((jsonTransfer) => {
      const userStr = JSON.stringify(jsonTransfer);
      const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
      console.log(jsonWEBAPI);

      if (jsonWEBAPI.http_result == 1) {
        var array = JSON.parse("[" + jsonWEBAPI.flights + "]");
        this.list_flights = array;
        this.destino = this.ptD + " to " + this.ptA;
        this.showTable = true;
        this.showMessage = false;
      } else if (jsonWEBAPI.http_result == 0) {
        this.msjAPI = jsonWEBAPI.msg;
        this.list_flights = [];
        this.editAlert("Sorry! ", this.msjAPI, "secondary", 1);
        this.showMessage = true;
        this.showTable = false;
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
  public closeMessage() {
    this.showMessage = false;
  }
  /**
   * closeMessage
   */
  public closeMessage_0() {
    this.modalMSG = -1;
  }


  /**
   * setptD
   * Selecciona el punto de partida 
   */
  public setptD(input: string) {
    if (input.trim().length > 0) {
      this.ptD = input;
    }
    if (this.ptD != "Enter your point of departure " && this.ptA != "Enter your point of arrival") {
      this.enableSF = true;
    }


  }
  /**
   * setptA
   * Selecciona el punto de llegada 
   */
  public setptA(input: string) {
    if (input.trim().length > 0) {
      this.ptA = input;
    }
    if (this.ptD != "Enter your point of departure " && this.ptA != "Enter your point of arrival") {
      this.enableSF = true;
    }
  }

  /**
   * numModal
   * 0: pointDeparture
   * 1: pointArrival
   * charModal
   * 
   */
  public changeModal(numModal: number, charModal: number, selectedItem: any) { //CharModal: Input seleccionado
    this.selectFlightID = selectedItem.flight_id;

    if (numModal == 0) {
      this.point = charModal;
    }
    this.showModal = numModal;
  }

  public signUp(numModal: number) { //CharModal: Input seleccionado
    this.showModal = numModal;
  }


}
