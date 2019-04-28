import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from './interface/customer';
import { CCard } from './interface/ccard';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  loadUniv: boolean = false;
  private api = 'http://localhost:64660/tecairlines/';

  constructor(private http: HttpClient) { }


  /**
   * Log In Customer
   * @param jsonData dataJson to transfer
   */
  logInCustomer(jsonData) {
    const path = `${this.api}login`;
    return this.http.post(path, "'" + JSON.stringify(jsonData) + "'", httpOptions);
  }

  /**
   * Create an acount Customer
   * @param customer dataJson to transfer
   */
  createCustomer(customer: Customer) {
    const path = `${this.api}signup`;
    return this.http.post(path, "'" + JSON.stringify(customer) + "'", httpOptions);
  }
  /**
   * Add a card to Customer
   * @param card dataJson to transfer
   */
  addCard(card: CCard) {
    const path = `${this.api}payment`;
    return this.http.post(path, "'" + JSON.stringify(card) + "'", httpOptions);
  }

  /**
   * Get all airports
   */
  getAirports() {
    const path = `${this.api}admin/airports`;
    return this.http.get(path);
  }

  /**
   * Get flights by the aerports of deparment and arrival
   * @param jsonData 
   */
  getFlightsByInputs(jsonData) {
    const path = `${this.api}flights`;
    return this.http.post(path, "'" + JSON.stringify(jsonData) + "'", httpOptions);
  }

  /**
   * Precheck a customer
   * @param dataFlightId  flight id selected
   */
  PreCheckCustomer(dataFlightId, username) {
    console.log("Fligth ID : "+dataFlightId);
    console.log("Username : "+username);
    const path = `${this.api}precheck/${username}/${dataFlightId}`;
    return this.http.post(path, "empty", httpOptions);
  }

  getListCheck(userName: string) {
    const path = `${this.api}${userName}/flights`;
    return this.http.get(path);
  }

  getListCards(userName: string) {
    const path = `${this.api}${userName}/cards`;
    return this.http.get(path);
  }

  /**
   * Get List of Universities
   */
  getUniversities() {
    const path = `${this.api}universities`;
    return this.http.get(path);
  }

  /**
   * Pay a Flight
   * @param jsonData dataJson to transfer
   * @param userName username of customer
   */
  payFlight(jsonData, userName: string) {
    const path = `${this.api}${userName}/pay-flight`;
    return this.http.post(path, "'" + JSON.stringify(jsonData) + "'", httpOptions);
  }

  /**
   * Book a flight
   * @param jsonData dataJson to transfer
   */
  book(jsonData) {    
    const path = `${this.api}booking`;
    return this.http.post(path, "'" + JSON.stringify(jsonData) + "'", httpOptions);
  }

  /**
   * Reservation a flight
   * @param jsonData dataJson to transfer
   * @param userName Customer's userName
   */
  reservation(jsonData, userName: string) {
    const path = `${this.api}${userName}/pay-flight`;
    return this.http.post(path, "'" + JSON.stringify(jsonData) + "'", httpOptions);
  }

  /**
   * Get list of flights ids
   */
  getListFlights_id() {
    const path = `${this.api}admin/flights/active`;
    return this.http.get(path);
  }
  /**
     * Get list of plane model
     */
  getPlaneModel() {
    const path = `${this.api}admin/airplanes`;
    return this.http.get(path);
  }

  isStudent(userName: string) {
    const path = `${this.api}${userName}/student`;
    return this.http.get(path);
  }

  GetSales(){
    const path = `${this.api}/sales`;
    return this.http.get(path);
  }
}
