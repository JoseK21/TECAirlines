import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  from: string = "Enter your point of departure ";
  to: string = "Enter your point of arrival";

  constructor() { }

  ngOnInit() {
  }

  /**
   * setFrom
   */
  public setFrom(f: string) {
    this.from = f;
    console.log("f: "+f);
  }

  /**
   * setTo
   */
  public setTo(t: string) {
    this.to = t;
    console.log("t: "+t);
  }
}
