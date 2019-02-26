import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DnipersonaService} from './services/dnipersona.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Proy01';
  verPage = false;
  usucod;
  uiduser;
  grupouser;
  permiso;


  constructor(private activatedRoute: ActivatedRoute,
              private servicePermiso: DnipersonaService) {


    this.activatedRoute.queryParams.subscribe(queryparams => {
      if (queryparams['usucod'] && queryparams['uid'] && queryparams['grupo'] || localStorage.getItem('accionLocalStorage')) {
        // this.verPage = true;
        this.usucod = queryparams['usucod'];
        this.uiduser = queryparams['uid'];
        this.grupouser = queryparams['grupo'];
        this.servicePermiso.getPermisos(this.usucod, this.grupouser, this.uiduser).subscribe(response => {
          this.permiso = response['VALOR'];
          console.log('EL PERMISO ENCONTRADO EN APP.COMPONENT.TS ' + this.permiso);
          localStorage.setItem('PERMISOLOCALSTORAGE', this.permiso);
          if (this.permiso === '299' || this.permiso === '300') {
            this.verPage = true;
          }
        });
      }
    });
  }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-blue sidebar-mini';
  }


  ngOnDestroy(): void {
    document.body.className = '';
  }
}
