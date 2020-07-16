import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DnipersonaService} from '../../services/dnipersona.service';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-searchmovimiento',
  templateUrl: './searchmovimiento.component.html',
  styleUrls: ['./searchmovimiento.component.css']
})
export class SearchmovimientoComponent implements OnInit {

  // TODO variables donde almacenar los datos encontrados mediante el GET
  imagePathPerson;
  directionPerson: string;
  nombresPerson: string;
  apMaterno: string;
  apPaterno: string;
  ubigeoPerson: string;
  dninumber: string;
  incidenciaVisita: string;
  mayorID: number;

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
  antecedentePolicialCode: string;
  antecedentePolicial_result: string;
  antecedenteJudicial: string;
  antecedentePenal: string;
  tipoMetodo: string;


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

  permisossearch = localStorage.getItem('PERMISOLOCALSTORAGE');

  verArea1 = false;
  // TODO DEJAR EN TRUE
  verAntecedentesSearch = true;

  constructor(private activatedRoute: ActivatedRoute,
              private dnipersonaService: DnipersonaService,
              private domSanitazer: DomSanitizer,
              private http: HttpClient,
              private router: Router) {

    console.log('PERMISOS SEARCH' + this.permisossearch);

    if (this.permisossearch === '300') {
      this.verArea1 = true;
      this.verAntecedentesSearch = false;
    }
    this.incidenciaVisita = ' ';
    this.mayorID = 0;
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
      console.log('el param para el dni es ' + params['dni']);

      this.dninumber = params['dni'];

      // TODO GRID visitas por DNI
      this.dnipersonaService.getVisitaByDni(this.dninumber)
        .subscribe((response: any) => {
          this.items = response;
          console.log(response);
          console.log('el tamaño de la busqueda' + this.items.length);
          console.log(response[this.items.length - 1]);
          for (let i = 0; i < this.items.length; i++) {
            if (response[i]['incidenciavisita'] !== null) {
              this.incidenciaVisita = this.incidenciaVisita + response[i]['incidenciavisita'];
            }

            if (this.mayorID < response[i]['id_visita']) {
              this.mayorID = response[i]['id_visita'];
            }

          }
          console.log('el numero mayor dentro de los ID' + this.mayorID);
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
          console.log(this.antecedentesFromService['ns2:verificarAntecedentesPenalesResponse']['xMensajeRespuesta']);
          this.antecedentePenal = this.antecedentesFromService['ns2:verificarAntecedentesPenalesResponse']['xMensajeRespuesta'];

          if (this.antecedentePenal.startsWith('El registro indicado no') || this.antecedentePenal.startsWith('El apellido materno')
            || this.antecedentePenal.startsWith('Se ha alcanzado')) {
            this.imageLoading = true;
          } else {
            this.imageLoading = false;
          }

          this.apLoading = true;
        });

      this.dnipersonaService.getAntecedentesPoliciales(params['dni'])
        .subscribe((resultado: any) => {
          this.antecedentesFromService = resultado;

          this.antecedentePolicial = this.antecedentesFromService['AntecedenteFinal'];
          console.log('EL ANTECEDENTES POLICIAL ES' + this.antecedentePolicial);

          if (this.antecedentePolicial === '0') {
            this.antecedentePolicial_result = 'No presenta antecedentes policiales';
            this.imageLoading2 = true;
          } else if (this.antecedentePolicial === '1') {
            this.antecedentePolicial_result = 'Presenta antecedentes Policiales';
            this.imageLoading2 = false;
          }
          this.apLoading2 = true;
        });

      this.dnipersonaService.getAntecedentesJudiciales(params['dni'])
        .subscribe((resultado: any) => {
          this.antecedentesFromService = resultado;
          console.log(this.antecedentesFromService['getAntecedenteJudicialResponse']['getAntecedenteJudicialReturn']);
          this.antecedenteJudicial = this.antecedentesFromService['getAntecedenteJudicialResponse']['getAntecedenteJudicialReturn'];


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

    console.log('ON INIT SEARCH COMPONENT' + localStorage.getItem('PERMISOLOCALSTORAGE'));

  }


}
