import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DnipersonaService} from '../../services/dnipersona.service';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {Router} from '@angular/router';
import {IntlModule} from '@progress/kendo-angular-intl';

@Component({
  selector: 'app-planedvisit',
  templateUrl: './planedvisit.component.html',
  styleUrls: ['./planedvisit.component.css']
})
export class PlanedvisitComponent {

  public gridView: GridDataResult;
  public pageSize = 10;
  public skip = 0;
  private data: Object[];

  private items: any[];

  constructor(private http: HttpClient,
              private visitaService: DnipersonaService,
              private router: Router) {

    // this.visitaService.getReunionPersonas()
    this.visitaService.getReunionPersonasOrder()
      .subscribe((response: any) => {
        this.items = response;
        console.log(response);
        this.loadItems();

        // const a = this.items[0]['invitado']['id_invitado'];
        // console.log('ESTE ES EL ID DEL INVITADO' + a);
      });
  }

  public cellClickHandler({sender, rowIndex, columnIndex, dataItem}) {
    console.log(dataItem['id_reunion_persona']);
    const dni = dataItem['invitado']['numeroDocu'];
    console.log(dni);
    this.router.navigate(['/search', dni]);
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

}
