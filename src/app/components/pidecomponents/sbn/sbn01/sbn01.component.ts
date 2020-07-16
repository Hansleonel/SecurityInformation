import {Component, OnInit} from '@angular/core';
import {PideService} from '../../../../services/pide.service';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-sbn01',
  templateUrl: './sbn01.component.html',
  styleUrls: ['./sbn01.component.css']
})
export class Sbn01Component implements OnInit {

  tokenJsonFromService = {};
  token: string;

  // TODO GRID visitas por DNI
  public gridView: GridDataResult;
  public pageSize = 10;
  public skip = 0;
  private data: Object[];
  private items: any[];

  editedPerson: string;

  // TODO


  constructor(private servicesbn: PideService) {
  }

  ngOnInit() {
  }


  buscarDatosInmueble(codigoCUS: string) {
    this.servicesbn.getTokenSBN().subscribe((response: any) => {
      console.log(response);
      this.tokenJsonFromService = response;
      console.log('el token para los servicios es'
        + this.tokenJsonFromService['s:Envelope']['s:Body']['AutenticarResponse']['AutenticarResult']['Token']);

      this.token = this.tokenJsonFromService['s:Envelope']['s:Body']['AutenticarResponse']['AutenticarResult']['Token'];

      this.buscarDatosInmuebleCUS(this.token, codigoCUS);


    });
  }

  buscarDatosInmuebleCUS(tokenSBN: string, codigoCUS: string) {
    this.servicesbn.getDatosInmueble(tokenSBN, codigoCUS).subscribe((response: any) => {
      console.log(response);
      this.items = response;
      this.loadItems();
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


  public editHandler({sender, rowIndex, dataItem}) {
    // this.closeEditor(sender);

    // this.editedRowIndex = rowIndex;
    this.editedPerson = Object.assign({}, dataItem);
    const idVisita: string = this.editedPerson['id_visita'];
    console.log('el id de la visita es' + idVisita);

    // console.log('LA RESPUESTA' + this.editedRowIndex, this.editedPerson);
    // const indice: string = this.editedPerson['numeroDocu'];
  }

  // TODO
}
