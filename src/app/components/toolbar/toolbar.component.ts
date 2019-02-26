import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DnipersonaService} from '../../services/dnipersona.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  codigoLocalUser = localStorage.getItem('usucodLocalStorage');
  nombresLocalUser = localStorage.getItem('nombresuserLocalStorage');
  apellidosLocalUser = localStorage.getItem('apellidosuserLocalStorage');
  oficinaLocalUser = localStorage.getItem('oficinauserLocalStorage');
  cargoLocalUser = localStorage.getItem('cargouserLocalStorage');
  photoLocalUser = localStorage.getItem('photouserLocalStorage');

  constructor(private activatedRoute: ActivatedRoute,
              private serviceUser: DnipersonaService) {


    /*this.activatedRoute.queryParams.subscribe(queryparams => {
      console.log('queryparams desde el constructor de toolbar.component.ts');
      console.log(queryparams['grupo']);
      console.log(queryparams['accion']);
      console.log(queryparams['usucod']);
      console.log(queryparams['uid']);

      this.codigoUser = queryparams['usuCod'];
    });*/
    this.activatedRoute.queryParams.subscribe(queryparams => {
      console.log('queryparams desde el onInit de toolbar.component.ts');
      console.log(queryparams['grupo']);
      console.log(queryparams['accion']);
      console.log(queryparams['usucod']);
      console.log(queryparams['uid']);

      this.codigoLocalUser = queryparams['usucod'];

      this.serviceUser.getDatosByUser(this.codigoLocalUser).subscribe(response => {
          console.log(response[0]['doc_iden']);

          this.nombresLocalUser = response[0]['nombre1'] + ' ' + response[0]['nombre2'];
          this.apellidosLocalUser = response[0]['ape_pat'] + ' ' + response[0]['ape_mat'];
          this.cargoLocalUser = response[0]['cargo'];
          this.oficinaLocalUser = response[0]['oficina'];
          this.photoLocalUser = 'http://10.24.9.39/BBDDLEGAJOS/FOTOS/' + String(response[0]['doc_iden'] + '.jpg');
          console.log('DENTRO DEL SERVICE' + this.photoLocalUser);
          if (queryparams['grupo']) {
            localStorage.setItem('grupoLocalStorage', String(queryparams['grupo']));
            localStorage.setItem('accionLocalStorage', String(queryparams['accion']));
            localStorage.setItem('usucodLocalStorage', String(queryparams['usucod']));
            localStorage.setItem('uidLocalStorage', String(queryparams['uid']));
            localStorage.setItem('photouserLocalStorage', this.photoLocalUser);
            localStorage.setItem('nombresuserLocalStorage', this.nombresLocalUser);
            localStorage.setItem('apellidosuserLocalStorage', this.apellidosLocalUser);
            localStorage.setItem('cargouserLocalStorage', this.cargoLocalUser);
            localStorage.setItem('oficinauserLocalStorage', this.oficinaLocalUser);

            console.log('DENTRO DEL SERVICE Y EL IF ' + this.photoLocalUser);
          }
        }
      );


      console.log('el grupo ' + localStorage.getItem('grupoLocalStorage'));
      console.log('el accion ' + localStorage.getItem('accionLocalStorage'));
      console.log('el usucod ' + localStorage.getItem('usucodLocalStorage'));
      console.log('el uid ' + localStorage.getItem('uidLocalStorage'));
      console.log('la photo ' + localStorage.getItem('photouserLocalStorage'));


    });

  }

  ngOnInit() {
  }

  dltLclStrg() {
    localStorage.clear();
    console.log(localStorage.getItem('grupo'));
  }

}
