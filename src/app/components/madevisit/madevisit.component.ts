import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DATOS, DnipersonaService} from '../../services/dnipersona.service';
import {GridComponent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {add} from '@progress/kendo-angular-inputs/dist/es2015/common/math';
import {take} from 'rxjs/operators';

// import {ItemModel, MenuEventArgs} from '@syncfusion/ej2-splitbuttons';

@Component({
  selector: 'app-madevisit',
  templateUrl: './madevisit.component.html',
  styleUrls: ['./madevisit.component.css']
})
export class MadevisitComponent {
  /*public data: Object[];
  public initialPage: Object;
  public dataItems: ItemModel[] = [
    {
      id: 'edit',
      text: 'entity.action.edit',
      iconCss: 'fa fa-pencil'
    },
    {
      id: 'delete',
      text: 'entity.action.delete',
      iconCss: 'fa fa-trash'
    }
  ];

  constructor(private http: HttpClient,
              private visitaService: DnipersonaService) {
    this.initialPage = {pageSizes: 20, pageCount: 4};
    console.log('Constructor establecido');
    // TODO la estructura para una peticion get debe de tener el url ademas del suscribe
    // TODO podemos asignarle a la respuesta cualquier nombre

    this.visitaService.getVisitas()
      .subscribe((respuesta: any) => {
        this.data = respuesta;
        for (let i = 0; i < this.data.length; i++) {
          const a: string = this.data[i]['invitado']['id_invitado'].toString();
          console.log(a);
          this.ValorAntecedente(a);
        }

        this.ValorAntecedente(this.data);
        console.log(respuesta);
      });
  }

  ValorAntecedente(dataIn) {

  }


  ngOnInit(): void {
    this.initialPage = {pageSizes: 20, pageCount: 4};
  }*/
  public gridView: GridDataResult;
  public pageSize = 10;
  public skip = 0;
  private data: Object[];

  private items: any[];

  @ViewChild(GridComponent)
  public grid: GridComponent;

  constructor(private http: HttpClient,
              private visitaService: DnipersonaService,
              private ngZone: NgZone) {

    this.visitaService.getVisitas()
      .subscribe((response: any) => {
        this.items = response;
        this.loadItems();

        const a = this.items[0]['invitado']['id_invitado'];
        console.log('ESTE ES EL ID DEL INVITADO' + a);
      });

    this.fitColumns();
  }


  public cellClickHandler({sender, rowIndex, columnIndex, dataItem}) {
    console.log(dataItem['id_visita']);
  }

  public cellClickHandler1(dataItem) {
    console.log(dataItem);
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  private loadItems(): void {
    this.gridView = {
      data: this.items.slice(this.skip, this.skip + this.pageSize),
      total: this.items.length
    };
  }

  private fitColumns(): void {
    this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {
      this.grid.autoFitColumns();
    });
  }


}
