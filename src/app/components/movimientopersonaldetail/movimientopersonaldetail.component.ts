import {Component, OnInit} from '@angular/core';
import {DnipersonaService} from '../../services/dnipersona.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Component({
  selector: 'app-movimientopersonaldetail',
  templateUrl: './movimientopersonaldetail.component.html',
  styleUrls: ['./movimientopersonaldetail.component.css']
})
export class MovimientopersonaldetailComponent implements OnInit {

  movimiento = {};
  idRegistro: string;
  idPersona: string;
  fechaMovimiento: string;
  horaIngreso: string;
  HoraS: string;
  numeroDocumento: string;
  unidadSigla: string;
  unidadDescripcion: string;
  tipoPersonal: string;
  piso: string;
  incidencia: string;
  confirmarRegistro = false;

  constructor(private activatedRoute: ActivatedRoute,
              private dniPersonaService: DnipersonaService,
              private router: Router) {
    this.datosMovimientoPersonalMindef();
  }

  ngOnInit() {
  }

  datosMovimientoPersonalMindef() {
    this.activatedRoute.params.subscribe(params => {
      this.idRegistro = params['idRegistro'];
    });
    this.dniPersonaService.getMovimiento(this.idRegistro).subscribe((response: any) => {
      console.log(response);
      this.idPersona = response['idPersonal'];
      this.fechaMovimiento = response['fecha'];
      this.horaIngreso = response['horaI'];
      this.HoraS = response['horaS'];
      this.numeroDocumento = response['nroDocumento'];
      this.unidadSigla = response['unidad']['sigla'];
      this.unidadDescripcion = response['unidad']['descripcion'];
      this.tipoPersonal = response['tipoPersonal']['nombre'];
      this.piso = response['piso'];
      this.incidencia = response['incidencia'];
    });
  }

  updateMovimientoPersonalMindef(incidenciaMovimiento, idMovimiento) {
    this.dniPersonaService.getMovimiento(idMovimiento).subscribe((response: any) => {
      this.movimiento = response;
      this.movimiento['incidencia'] = incidenciaMovimiento;

      this.dniPersonaService.putIncidenciaMovimiento(this.movimiento, httpOptions).subscribe(responsePut => {
        console.log(responsePut);
        this.confirmarRegistro = true;
      }, error1 => {
        console.log(error1);
      });
    });
  }

  volverSearch(numeroDoc) {
    this.router.navigate(['/search', numeroDoc]);
  }
}
