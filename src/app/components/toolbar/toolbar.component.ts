import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  codigoUser = '';

  constructor(private activatedRoute: ActivatedRoute) {


    this.activatedRoute.queryParams.subscribe(queryparams => {
      console.log(queryparams['grupo']);
      console.log(queryparams['accion']);
      console.log(queryparams['usucod']);
      console.log(queryparams['uid']);

      this.codigoUser = queryparams['usuCod'];
    });
  }

  ngOnInit() {
  }

}
