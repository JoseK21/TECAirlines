import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-passeger-check',
  templateUrl: './passeger-check.component.html',
  styleUrls: ['./passeger-check.component.css']
})
export class PassegerCheckComponent implements OnInit {


  listCheck = [];
  text: string;
  msj: string;
  type: string;
  showTable: boolean;
  username:string;
  

  codeQR = 'https://getbootstrap.com/docs/4.0/components/modal/';
  showMessage: boolean = false;

  constructor(private service: ServiceService) { }

  ngOnInit() {
  }

  /**
   * sendData
   */
  public goToCheck(userName: string) {
    if (userName.trim().length == 0) {
      this.editAlert("Warning! ", "Empty input", "warning");
    } else {
      this.service.getListCheck(userName).subscribe((jsonTransfer) => {          
        const userStr = JSON.stringify(jsonTransfer);
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
        if (jsonWEBAPI.http_result == 1) {
          var array = JSON.parse("[" + jsonWEBAPI.flights + "]");
          if (array.length == 0) {
            this.editAlert("Sorry! ", "This user does't have reservations", "warning");
          } else {
            this.listCheck = array;
            this.showTable = true;   
            this.username=userName;
          }
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Sorry! ", "This account doesn't have flight to check", "warning");
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
            this.editAlert("Sorry! ", "This user does't have reservations", "warning");
          } else {
            this.listCheck = array;
            this.showTable = true;             }
        } else if (jsonWEBAPI.http_result == 0) {
          this.editAlert("Sorry! ", "This account doesn't have flight to check", "warning");
        } else {
          alert("ERROR DEL JSON.... home.componet");
        }
      });
  }

  /**
   * editAlert
   */
  public editAlert(msg: string, text: string, type: string) {    
    this.msj = msg;
    this.text = text;
    this.type = type;
    this.showMessage=true;
  }

  /**
   * changeModeShow
   */
  public changeModeShow() {
    this.showMessage = false;
  }
}
