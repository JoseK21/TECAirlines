import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  list_promotions = [];  //Default
  msj: string = "";
  text: string = "";
  type: string = "";
  modalMSG: number = -1;
  showTable: boolean = false; 

  constructor(private service: ServiceService) { }

  ngOnInit() {}

  /**
   * logIn Login of a Customer
   * @param un UserName
   * @param pw Password
   */
  public logIn(un: string, pw: string) {
    if (un.trim() == "" || pw.trim() == "") {
      this.editAlert("Warning! ", "Empty inputs", "warning", 0);
    } else {
      const json = { password: pw, username: un, };
      this.service.logInCustomer(json).subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer);
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr));
        if (jsonWEBAPI.http_result == 1) {
          this.isStudent(un);
        } else if (jsonWEBAPI.http_result == 0) {
          this.showTable = false;
          this.editAlert("Error! ", jsonWEBAPI.msg, "warning", 0);
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
          this.modalMSG = -1;
          this.GetSales();
        } else {
          this.showTable = false;
          this.editAlert("Error! ", "This user is not a student", "warning", 0);
        }
      } else if (jsonWEBAPI.http_result == 0) {
        this.showTable = false;
        this.editAlert("Error! ", jsonWEBAPI.msg, "warning", 0);
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
        this.editAlert("Error! ", jsonWEBAPI.msg, "warning", 1);
      } else {
        alert("ERROR DEL JSON.... home.componet");
      }
    });
  }

  /**
   * editAlert
   */
  public editAlert(msg: string, text: string, type: string, num: number) {
    this.msj = msg;
    this.text = text;
    this.type = type;
    this.modalMSG = num;
  }
  /**
   * closeMessage
   */
  public closeMessage() {
    this.modalMSG = -1;
  }
}
