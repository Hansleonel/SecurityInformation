import {Component, OnInit} from '@angular/core';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {HttpClient} from '@angular/common/http';
import {DnipersonaService} from '../../services/dnipersona.service';

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

  private items: any[];

  constructor(private http: HttpClient,
              private personaService: DnipersonaService) {

    this.personaService.getPersonas()
      .subscribe((response: any) => {
        this.items = response;
        for (let i = 0; i < response.length; i++) {
          console.log(this.items[i]['numeroDocu']);
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
  }

}
