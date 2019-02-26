import {Component, OnInit} from '@angular/core';
import {DnipersonaService} from '../../services/dnipersona.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  datosEncontradosDniPersona = {};

  constructor(private activatedRoute: ActivatedRoute,
              private dniPersonaService: DnipersonaService,
              private router: Router) {

    this.activatedRoute.queryParams.subscribe(queryparams => {
      console.log('queryparams desde el constructor de home.component.ts');
      console.log(queryparams['grupo']);
      console.log(queryparams['accion']);
      console.log(queryparams['usucod']);
      console.log(queryparams['uid']);

      if (queryparams['grupo']) {
        localStorage.setItem('grupoLocalStorage', String(queryparams['grupo']));
        localStorage.setItem('accionLocalStorage', String(queryparams['accion']));
        localStorage.setItem('usucodLocalStorage', String(queryparams['usucod']));
        localStorage.setItem('uidLocalStorage', String(queryparams['uid']));
      }
      console.log('el grupo ' + localStorage.getItem('grupoLocalStorage'));
      console.log('el accion ' + localStorage.getItem('grupoLocalStorage'));
      console.log('el usucod ' + localStorage.getItem('grupoLocalStorage'));
      console.log('el uid ' + localStorage.getItem('grupoLocalStorage'));

    });

  }

  ngOnInit() {
  }

  getRuteo(dni: string) {

    // TODO comentamos estas lineas puesto que solo son necesrias en caso se necesite usar el servicio
    // TODO en un principio se agregaron dichas lineas para ver los datos de la persona
    // TODO pero los datos se mostraran en otro componente
    // TODO solo es necesario hacer el ruteo a dicho componente
    /*this.dniPersonaService.getDatosDni(dni)
      .subscribe((response): any => {
        this.datosEncontradosDniPersona = response;
      });*/
    console.log(dni);

    // TODO ruteo con parametro
    this.router.navigate(['search/', dni]);
  }

}
