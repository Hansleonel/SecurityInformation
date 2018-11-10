import {Component, OnInit} from '@angular/core';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DnipersonaService} from '../../services/dnipersona.service';
import {Router} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent implements OnInit {

  public gridView: GridDataResult;
  public pageSize = 10;
  public skip = 0;
  private data: Object[];

  antecedentePolicial: string;
  antecedentePolicial_result: string;
  antecedenteJudicial: string;
  antecedentePenal: string;

  antecedentesFromService = {};
  invitado = {};

  loading: boolean;

  private items: any[];

  editedRowIndex: number;
  editedPerson: string;

  constructor(private http: HttpClient,
              private personaService: DnipersonaService,
              private router: Router) {

    this.personaService.getPersonasOrder()
      .subscribe((response: any) => {
        this.items = response;
        for (let i = 0; i < response.length; i++) {
          console.log(this.items[i]['numeroDocu']);

          const a: string = this.items[i]['antecedenteP'];

          if (a != null) {
            if (a.startsWith('SI')) {
              this.loading = true;
            } else {
              this.loading = false;
            }
          } else {
            this.loading = true;
          }
          /*this.personaService.getAntecedentesPoliciales(this.items[i]['numeroDocu'])
            .subscribe((resultado: any) => {
              this.antecedentesFromService = resultado;
              console.log(this.antecedentesFromService['S:Envelope']['S:Body']
                ['ns0:consultaNombreGeneralResponse']['return']);
              this.antecedentePolicial = this.antecedentesFromService['S:Envelope']['S:Body']
                ['ns0:consultaNombreGeneralResponse']['return'];

              if (parseFloat(this.antecedentePolicial) === 1) {
                this.antecedentePolicial_result = 'Preseta antecedentes policiales';
              } else {
                this.antecedentePolicial_result = 'NO Presenta antecedentes policiales';
              }

            });*/
        }
        this.loadItems();
      });
  }

  ngOnInit() {
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

  public cellClickHandler({sender, rowIndex, columnIndex, dataItem}) {
    console.log(dataItem['numeroDocu']);
    const id = dataItem['id_invitado'];
    this.updatePersona(id);
  }

  public editHandler({sender, rowIndex, dataItem}) {
    // this.closeEditor(sender);

    this.editedRowIndex = rowIndex;
    this.editedPerson = Object.assign({}, dataItem);

    console.log('LA RESPUESTA' + this.editedRowIndex, this.editedPerson);
    const indice: string = this.editedPerson['numeroDocu'];
    this.router.navigate(['/search', indice]);
  }

  updatePersona(id: string) {

    this.personaService.getPersona(id)
      .subscribe((response: any) => {
        this.invitado = response;
        const numeroDocu = this.invitado['numeroDocu'];
        const tipoDoc = this.invitado['tipoDocu'];
        if (tipoDoc === 1) {
          console.log('El tipo de documento es un DNI' + tipoDoc);
          this.personaService.getAntecedentesPoliciales(numeroDocu)
            .subscribe((resultado: any) => {
              this.antecedentesFromService = resultado;
              console.log(this.antecedentesFromService['S:Envelope']['S:Body']
                ['ns0:consultaNombreGeneralResponse']['return']);
              this.antecedentePolicial = this.antecedentesFromService['S:Envelope']['S:Body']
                ['ns0:consultaNombreGeneralResponse']['return'];

              if (parseFloat(this.antecedentePolicial) === 1) {
                this.antecedentePolicial_result = 'SI Preseta antecedentes policiales';
              } else {
                this.antecedentePolicial_result = 'NO Presenta antecedentes policiales';
              }

              this.invitado['antecedenteP'] = this.antecedentePolicial_result;

              this.http.put('http://localhost:8080/api/invitado', this.invitado, httpOptions).subscribe(responsePut => {
                console.log(responsePut);
              });

            });
        } else {
          console.log('El tipo de Documento NO es un DNI' + tipoDoc);
        }


      });


  }

}
