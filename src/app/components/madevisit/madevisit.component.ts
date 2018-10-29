import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DnipersonaService} from '../../services/dnipersona.service';
import {ItemModel, MenuEventArgs} from '@syncfusion/ej2-splitbuttons';

@Component({
  selector: 'app-madevisit',
  templateUrl: './madevisit.component.html',
  styleUrls: ['./madevisit.component.css']
})
export class MadevisitComponent implements OnInit {
  public data: Object[];
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
  }
}
