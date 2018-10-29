import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DnipersonaService} from '../../services/dnipersona.service';

@Component({
  selector: 'app-planedvisit',
  templateUrl: './planedvisit.component.html',
  styleUrls: ['./planedvisit.component.css']
})
export class PlanedvisitComponent implements OnInit {

  public dataReunion: Object[];
  public initialPage: any;

  constructor(private http: HttpClient,
              private reunionService: DnipersonaService) {

    this.initialPage = {pageSizes: 20, pageCount: 4};

    this.reunionService.getReunionPersonas()
      .subscribe((respuesta: any) => {
        this.dataReunion = respuesta;
      });
  }

  ngOnInit() {
  }

}
