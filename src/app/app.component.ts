import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DnipersonaService} from './services/dnipersona.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'SISCOM';
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
          this.permiso = '299';
          console.log('EL PERMISO ENCONTRADO EN APP.COMPONENT.TS ' + this.permiso);
          localStorage.setItem('PERMISOLOCALSTORAGE', this.permiso);
          // localStorage.setng build --prod --base-href ./Item('PERMISOLOCALSTORAGE', '299');
          if (this.permiso === '299' || this.permiso === '300') {
            console.log('ENTRO CON EL PERMISO LOCALSTORAGE' + localStorage.getItem('PERMISOLOCALSTORAGE'));
            this.verPage = true;
          }
        });
      }
      /* this.servicePermiso.getPermisos(localStorage.getItem('usucodLocalStorage'), localStorage.getItem('grupoLocalStorage'), localStorage.getItem('uidLocalStorage')).subscribe(response => {
        // this.permiso = '299';
        console.log('EL PERMISO ENCONTRADO EN APP.COMPONENT.TS ' + response['VALOR']);
        localStorage.setItem('PERMISOLOCALSTORAGE', response['VALOR']);

        this.permiso = response['VALOR'];
        // this.permiso = '299';
        console.log('EL PERMISO ENCONTRADO EN APP.COMPONENT.TS ' + this.permiso);
        localStorage.setItem('PERMISOLOCALSTORAGE', this.permiso);
        // localStorage.setItem('PERMISOLOCALSTORAGE', '299');
        if (this.permiso === '299' || this.permiso === '300') {
          console.log('ENTRO CON EL PERMISO LOCALSTORAGE' + localStorage.getItem('PERMISOLOCALSTORAGE'));
          this.verPage = true;
        }
      });*/


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
