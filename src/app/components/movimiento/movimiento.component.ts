import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css']
})
export class MovimientoComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  getRuteoPersonal(dni: string) {
    this.router.navigate(['searchMovimiento/', dni]);
  }

}
