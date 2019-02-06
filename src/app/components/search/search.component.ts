import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DnipersonaService} from '../../services/dnipersona.service';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


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
  dninumber: string;

  loading: boolean;
  informacionLoading: boolean;
  apLoading: boolean;
  apLoading2: boolean;
  apLoading3: boolean;

  imageLoading: boolean;
  imageLoading2: boolean;
  imageLoading3: boolean;


  antecedentesFromService = {};

  antecedentePolicial: string;
  antecedentePolicial_result: string;
  antecedenteJudicial: string;
  antecedentePenal: string;


  dateToday = new Date();

  // TODO GRID visitas por DNI
  public gridView: GridDataResult;
  public pageSize = 10;
  public skip = 0;
  private data: Object[];
  private items: any[];

  // TODO

  // TODO UPDATE VISITA
  visita = {};

  // TODO

  constructor(private activatedRoute: ActivatedRoute,
              private dnipersonaService: DnipersonaService,
              private domSanitazer: DomSanitizer,
              private http: HttpClient,
              private router: Router) {

    this.loading = false;
    this.informacionLoading = false;
    this.apLoading = false;
    this.apLoading2 = false;
    this.apLoading3 = false;

    this.imageLoading = true;
    this.imageLoading2 = true;
    this.imageLoading3 = true;

    // TODO obtener los parametro de la ruta es decir el dni que viene con https://rutapage.com/#/search/PARAMETROQUESEQUIEREOBTENER
    this.activatedRoute.params.subscribe(params => {
      console.log(params['dni']);

      this.dninumber = params['dni'];

      // TODO GRID visitas por DNI
      this.dnipersonaService.getVisitaByDni(this.dninumber)
        .subscribe((response: any) => {
          this.items = response;
          console.log(response);
          this.loadItems();
        });
      // TODO


      // TODO utilizando un get para la consulta de nombres, direccion, photographia
      // TODO esta consulta deberia de realizarce en un service
      this.http.get('http://10.24.9.78/mindef-starter-0.0.1-SNAPSHOT/api/dni/' + params['dni'])
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

          if (this.antecedentePenal.startsWith('El registro indicado no') || this.antecedentePenal.startsWith('El apellido materno')) {
            this.imageLoading = true;
          } else {
            this.imageLoading = false;
          }


          this.apLoading = true;
        });

      this.dnipersonaService.getAntecedentesPoliciales(params['dni'])
        .subscribe((resultado: any) => {
          this.antecedentesFromService = resultado;
          console.log(this.antecedentesFromService['S:Envelope']['S:Body']
            ['ns0:consultarPersonaNroDocResponse']['RespuestaPersona']['descripcionMensaje']);
          this.antecedentePolicial = this.antecedentesFromService['S:Envelope']['S:Body']
            ['ns0:consultarPersonaNroDocResponse']['RespuestaPersona']['descripcionMensaje'];

          /*if (parseFloat(this.antecedentePolicial) === 0) {
            this.antecedentePolicial_result = 'No preseta antecedentes policiales';
            this.imageLoading2 = true;
          } else if (parseFloat(this.antecedentePolicial) === 1) {
            this.antecedentePolicial_result = 'Presenta antecedentes policiales';
            this.imageLoading2 = false;
          }*/

          if (this.antecedentePolicial.startsWith('No')) {
            this.antecedentePolicial_result = 'No presenta antecedentes policiales';
            this.imageLoading2 = true;
          } else {
            this.antecedentePolicial_result = 'Presenta antecedentes Policiales';
            this.imageLoading2 = false;
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


          if (this.antecedenteJudicial.startsWith('No registra antecedentes')) {
            this.imageLoading3 = true;
          } else {
            this.imageLoading3 = false;
          }

          this.apLoading3 = true;
        });

    });

  }

  editedPerson: string;

  public editHandler({sender, rowIndex, dataItem}) {
    // this.closeEditor(sender);

    // this.editedRowIndex = rowIndex;
    this.editedPerson = Object.assign({}, dataItem);
    const idVisita: string = this.editedPerson['id_visita'];
    console.log('el id de la visita es' + idVisita);

    // console.log('LA RESPUESTA' + this.editedRowIndex, this.editedPerson);
    // const indice: string = this.editedPerson['numeroDocu'];
    this.router.navigate(['/detalleVisita', idVisita]);
  }

  updateIncidenteVisita(incidencia: string) {
    console.log(incidencia);
    this.dnipersonaService.getVisita('308')
      .subscribe((response: any) => {
        this.visita = response;
        console.log(this.visita);
        this.visita['cargo'] = 'APOYO ADMINISTRATIVO';
        console.log(this.visita);

        this.http.put('http://10.24.9.78/mindef-starter-0.0.1-SNAPSHOT/api/visitas', this.visita, httpOptions).subscribe(responsePut => {
          console.log(responsePut);
        });
      });

  }

  // TODO GRID visitas por DNI
  private loadItems(): void {
    this.gridView = {
      data: this.items.slice(this.skip, this.skip + this.pageSize),
      total: this.items.length
    };
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  // TODO

  ngOnInit() {

  }

}
