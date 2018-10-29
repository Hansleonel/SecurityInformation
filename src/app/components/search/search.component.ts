import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DnipersonaService} from '../../services/dnipersona.service';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // TODO variables donde almacenar los datos encontrados mediante el GET
  imagePathPerson;
  directionPerson: string;
  nombresPerson: string;
  apMaterno: string;
  apPaterno: string;
  ubigeoPerson: string;

  loading: boolean;
  informacionLoading: boolean;
  apLoading: boolean;
  apLoading2: boolean;
  apLoading3: boolean;

  antecedentesFromService = {};

  antecedentePolicial: string;
  antecedentePolicial_result: string;
  antecedenteJudicial: string;
  antecedentePenal: string;


  dateToday = new Date();

  constructor(private activatedRoute: ActivatedRoute,
              private dnipersonaService: DnipersonaService,
              private domSanitazer: DomSanitizer,
              private http: HttpClient) {

    this.loading = false;
    this.informacionLoading = false;
    this.apLoading = false;
    this.apLoading2 = false;
    this.apLoading3 = false;

    // TODO obtener los parametro de la ruta es decir el dni que viene con https://rutapage.com/#/search/PARAMETROQUESEQUIEREOBTENER
    this.activatedRoute.params.subscribe(params => {
      console.log(params['dni']);

      // TODO utilizando un get para la consulta de nombres, direccion, photographia
      // TODO esta consulta deberia de realizarce en un service
      this.http.get('http://localhost:8080/api/dni/' + params['dni'])
        .subscribe((respuesta: any) => {

          // TODO almacenando dentro de las varibles creadas en la parte superior
          // TODO la respuesta encontrada en formato Json
          this.nombresPerson = respuesta['nombres'];
          this.apPaterno = respuesta['apPaterno'];
          this.apMaterno = respuesta['apMaterno'];
          this.directionPerson = respuesta['direccion'];
          // TODO para poder mostrar una photo que proviene de un base64 en angular debemos de
          // TODO utilizar un DomSanitizer por cuestiones de seguridad
          this.imagePathPerson = this.domSanitazer.bypassSecurityTrustUrl('data:image/jpg;base64,' + respuesta['foto']);
          this.ubigeoPerson = respuesta['ubigeo'];

          this.loading = true;
          this.informacionLoading = true;

          console.log(this.nombresPerson);

        });

      this.dnipersonaService.getAntecedentesPenales(params['dni'])
        .subscribe((resultado: any) => {

          this.antecedentesFromService = resultado;
          console.log(this.antecedentesFromService['soap:Envelope']['soap:Body']
            ['ns2:verificarAntecedentesPenalesResponse']['xMensajeRespuesta']);
          this.antecedentePenal = this.antecedentesFromService['soap:Envelope']['soap:Body']
            ['ns2:verificarAntecedentesPenalesResponse']['xMensajeRespuesta'];

          this.apLoading = true;
        });

      this.dnipersonaService.getAntecedentesPoliciales(params['dni'])
        .subscribe((resultado: any) => {
          this.antecedentesFromService = resultado;
          console.log(this.antecedentesFromService['S:Envelope']['S:Body']
            ['ns0:consultaNombreGeneralResponse']['return']);
          this.antecedentePolicial = this.antecedentesFromService['S:Envelope']['S:Body']
            ['ns0:consultaNombreGeneralResponse']['return'];

          if (parseFloat(this.antecedentePolicial) === 0) {
            this.antecedentePolicial_result = 'No preseta antecedentes policiales';
          } else if (parseFloat(this.antecedentePolicial) === 1) {
            this.antecedentePolicial_result = 'Presenta antecedentes policiales';
          }

          this.apLoading2 = true;
        });

      this.dnipersonaService.getAntecedentesJudiciales(params['dni'])
        .subscribe((resultado: any) => {
          this.antecedentesFromService = resultado;
          console.log(this.antecedentesFromService['soapenv:Envelope']['soapenv:Body']
            ['getAntecedenteJudicialResponse']['getAntecedenteJudicialReturn']);
          this.antecedenteJudicial = this.antecedentesFromService['soapenv:Envelope']['soapenv:Body']
            ['getAntecedenteJudicialResponse']['getAntecedenteJudicialReturn'];

          this.apLoading3 = true;
        });

    });

  }

  ngOnInit() {

  }

}
