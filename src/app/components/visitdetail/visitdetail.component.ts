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
  documentoVisitado: string;
  photoVisitado: string;
  motivo: string;
  lugarReunion: string;
  nombreCompleto: string;
  nombreCompletoVisitado: string;
  cargo: string;
  oficinaVisitado: string;
  incidencia: string;
  completado = 0;

  nombreAutoriza: string;
  documentoAutoriza: string;
  oficinaAutoriza: string;
  cargoAutoriza: string;
  photoAutoriza: string;

  valorClass = 'box box-widget collapsed-box';
  valorStyle = 'display: none;';
  valorClass2 = 'box box-widget collapsed-box';
  valorStyle2 = 'display: none;';


  constructor(private activatedRoute: ActivatedRoute,
              private services: DnipersonaService,
              private http: HttpClient,
              private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      console.log(params['idvisita']);

      this.idVisita = params['idvisita'];
      console.log('el valor del id Visista es ' + this.idVisita);
      this.services.getVisitaCalidad(this.idVisita).subscribe((response: any) => {
        this.visita = response;
        this.fechaVisita = this.visita['fechavisita'];
        this.lugarReunion = this.visita['lugarReunion']['descripcion'];
        this.documentoVisitante = this.visita['invitado']['numeroDocu'];
        this.documentoVisitado = this.visita['empleadoVisitado']['doc_iden'];
        this.nombreCompleto = this.visita['invitado']['apellidoP_invitado'] + ' '
          + this.visita['invitado']['apellidoM_invitado'] + ' '
          + this.visita['invitado']['nombre_invitado'];
        this.nombreCompletoVisitado = this.visita['empleadoVisitado']['ape_pat'] + ' '
          + this.visita['empleadoVisitado']['ape_mat'] + ' '
          + this.visita['empleadoVisitado']['nombre1'];
        this.cargo = this.visita['cargo'];
        this.oficinaVisitado = this.visita['empleadoVisitado']['oficina'];
        this.photoVisitado = 'http://10.24.9.39/BBDDLEGAJOS/FOTOS/' + String(this.documentoVisitado + '.jpg');
        // this.siglaOficinaVisitado = this.visita['lugarReunion']['sigla'];
        this.incidencia = this.visita['incidenciavisita'];
        this.horaingreso = this.visita['horaingreso'];
        this.motivo = this.visita['motivo']['no_motivo'];

        this.documentoAutoriza = this.visita['empleadoAutoriza']['doc_iden'];
        this.photoAutoriza = 'http://10.24.9.39/BBDDLEGAJOS/FOTOS/' + String(this.documentoAutoriza + '.jpg');
        this.nombreAutoriza = this.visita['empleadoAutoriza']['ape_pat'] + ' '
          + this.visita['empleadoAutoriza']['ape_mat'] + ' '
          + this.visita['empleadoAutoriza']['nombre1'];
        this.oficinaAutoriza = this.visita['empleadoAutoriza']['oficina'];
        this.cargoAutoriza = this.visita['empleadoAutoriza']['cargo'];
        console.log(this.visita);
      });


    });

  }

  ngOnInit() {
  }

  updateIncidencia(incidencia, id_Visita) {
    const url = 'http://10.24.9.78/mindef-starter-0.0.1-SNAPSHOT/api/visitasIncidente';
    const urlCalidad = 'http://localhost:8080/api/visitasIncidente';
    console.log(incidencia);
    this.services.getVisita(id_Visita)
      .subscribe((response: any) => {
        this.visita = response;
        console.log(this.visita);
        // this.visita['cargo'] = 'APOYO ADMINISTRATIVO';
        this.visita['incidenciavisita'] = incidencia;
        console.log(this.visita);
        this.completado = 1;
        this.http.put(urlCalidad, this.visita, httpOptions).subscribe(responsePut => {
          console.log(responsePut);
        });
      });

  }

  mostrarCollapse() {
    this.valorClass = 'box box-widget';
    this.valorStyle = 'display';
  }

  mostrarCollapse2() {
    this.valorClass2 = 'box box-widget';
    this.valorStyle2 = 'display';
  }

  volvr(documento) {
    this.router.navigate(['/search', documento]);
  }
}
