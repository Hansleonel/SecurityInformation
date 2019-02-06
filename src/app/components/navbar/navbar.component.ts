import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  statusClass1 = false;
  statusClass2 = false;
  statusClass3 = false;
  statusClass4 = false;

  constructor() {
  }

  ngOnInit() {
  }

  eventoClick() {
    this.statusClass1 = !this.statusClass1;
    if (this.statusClass1 === true) {
      this.statusClass2 = false;
      this.statusClass3 = false;
      this.statusClass4 = false;
    }
  }

  eventoClick2() {
    this.statusClass2 = !this.statusClass2;
    if (this.statusClass2 === true) {
      this.statusClass1 = false;
      this.statusClass3 = false;
      this.statusClass4 = false;
    }
  }

  eventoClick3() {
    this.statusClass3 = !this.statusClass3;
    if (this.statusClass3 === true) {
      this.statusClass2 = false;
      this.statusClass1 = false;
      this.statusClass4 = false;
    }
  }

  eventoClick4() {
    this.statusClass4 = !this.statusClass4;
    if (this.statusClass4 === true) {
      this.statusClass1 = false;
      this.statusClass3 = false;
      this.statusClass2 = false;
    }
  }

}
