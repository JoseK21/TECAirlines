import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isStudent: boolean = false;
  msj: string = "";
  text: string = "";
  type: string = "";
  showMessage: boolean = false;

  loadUni: boolean = false;
  list_univ = [];
  constructor(private service: ServiceService) { }

  ngOnInit() {}

  /**
   * checkStudent Change condition Student 
   */
  public checkStudent() {
    this.isStudent = !this.isStudent;
  }

  /**
  * editAlert
  */
  public editAlert(msg: string, text: string, type: string) {    
    this.msj = msg;
    this.text = text;
    this.type = type;
    this.showMessage = true;
  }

  /**
   * changeModeShow
   */
  public changeModeShow() {
    this.showMessage = false;
  }

  /* WEB API */
   /**
    * createCustomer Create an acount of Custumer
    * @param fn first name
    * @param ln last name
    * @param uvn university name
    * @param c carnet
    * @param e email
    * @param p phone number
    * @param un username
    * @param pw password
    */
  public createCustomer(fn: string, ln: string, uvn: string, c: string, e: string, p: string, un: string, pw: string) {

    if (this.isStudent) {
      if (fn.trim() == "" || ln.trim() == "" || uvn.trim() == "" || c.trim() == "" || e.trim() == "" || p.trim() == "" || un.trim() == "" || pw.trim() == "") {
        this.editAlert("Warning! ", "Empty or wrong inputs", "warning");
      } else {
        const json = {
          full_name: fn + " " + ln, phone_numbr: p, email: e, is_student: this.isStudent, college_name: uvn,
          student_id: Number(c), username: un, password: pw
        };

        this.service.createCustomer(json).subscribe((jsonTransfer) => {
          const userStr = JSON.stringify(jsonTransfer);
          const jsonWEBAPI = JSON.parse(JSON.parse(userStr)); 
          if (jsonWEBAPI.http_result == 1) {
            this.editAlert("Success! ", jsonWEBAPI.msg, "success");
          } else if (jsonWEBAPI.http_result == 0) {
            this.editAlert("Error! ", jsonWEBAPI.msg, "danger");
          } else {
            alert("ERROR DEL JSON.... sign-up.componet");
          }
        });
      }
    } else {
      if (fn.trim() == "" || ln.trim() == "" || e.trim() == "" || p.trim() == "" || un.trim() == "" || pw.trim() == "") {
        this.editAlert("Warning! ", "Empty or wrong inputs", "warning");
      } else {
        const json = {
          full_name: fn + " " + ln, phone_numbr: p, email: e,
          is_student: this.isStudent, college_name: uvn, student_id: Number(c), username: un,
          password: pw
        };
        this.service.createCustomer(json).subscribe((jsonTransfer) => {
          const userStr = JSON.stringify(jsonTransfer); 
          const jsonWEBAPI = JSON.parse(JSON.parse(userStr)); 
          if (jsonWEBAPI.http_result == 1) {
            this.editAlert("Success! ", jsonWEBAPI.msg, "success");
          } else if (jsonWEBAPI.http_result == 0) {
            this.editAlert("Error! ", jsonWEBAPI.msg, "danger");
          } else {
            alert("ERROR DEL JSON.... sing-up.componet");
          }
        });
      }
    }
  }



  /**
   * getAirport
   */
  public getUniversities() {
    if (!this.loadUni) {
      this.service.getUniversities().subscribe((jsonTransfer) => {
        const userStr = JSON.stringify(jsonTransfer); // Object to String
        const jsonWEBAPI = JSON.parse(JSON.parse(userStr)); // String to Json
        if (jsonWEBAPI.http_result == 1) {
          this.list_univ = jsonWEBAPI.universities;
          this.loadUni = true;
        } else if (jsonWEBAPI.http_result == 0) {
        } else {
          alert("ERROR DEL JSON....");
        }
      });
    }
  }

}
