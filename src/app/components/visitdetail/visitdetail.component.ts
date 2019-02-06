import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DnipersonaService} from '../../services/dnipersona.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Component({
  selector: 'app-visitdetail',
  templateUrl: './visitdetail.component.html',
  styleUrls: ['./visitdetail.component.css']
})
export class VisitdetailComponent implements OnInit {

  idVisita: string;
  visita = {};

  fechaVisita: string;
  horaingreso: string;
  documentoVisitante: string;
  motivo: string;
  nombreCompleto: string;
  cargo: string;
  incidencia: string;
  completado = 0;


  constructor(private activatedRoute: ActivatedRoute,
              private services: DnipersonaService,
              private http: HttpClient,
              private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      console.log(params['idvisita']);

      this.idVisita = params['idvisita'];
      console.log('el valor del id Visista es ' + this.idVisita);
      this.services.getVisita(this.idVisita).subscribe((response: any) => {
        this.visita = response;
        this.fechaVisita = this.visita['fechavisita'];
        this.documentoVisitante = this.visita['invitado']['numeroDocu'];
        this.nombreCompleto = this.visita['invitado']['apellidoP_invitado'] + ' '
          + this.visita['invitado']['apellidoM_invitado'] + ' '
          + this.visita['invitado']['nombre_invitado'];
        this.cargo = this.visita['cargo'];
        this.incidencia = this.visita['incidenciavisita'];
        this.horaingreso = this.visita['horaingreso'];
        console.log(this.visita);
      });


    });

  }

  ngOnInit() {
  }

  updateIncidencia(incidencia, id_Visita) {
    console.log(incidencia);
    this.services.getVisita(id_Visita)
      .subscribe((response: any) => {
        this.visita = response;
        console.log(this.visita);
        // this.visita['cargo'] = 'APOYO ADMINISTRATIVO';
        this.visita['incidenciavisita'] = incidencia;
        console.log(this.visita);
        this.completado = 1;
        this.http.put('http://10.24.9.78/mindef-starter-0.0.1-SNAPSHOT/api/visitasIncidente', this.visita, httpOptions).subscribe(responsePut => {
          console.log(responsePut);
        });
      });

  }

  volvr(documento) {
    this.router.navigate(['/search', documento]);
  }
}
