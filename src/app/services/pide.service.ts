import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PideService {

  constructor(private http: HttpClient) {
  }

  getTokenSBN() {
    return this.http.get('http://localhost:8080/api/getTokenSBN/1');
  }

  getDatosInmueble(token: string, codigoCUS: string) {
    // return this.http.get(`http://localhost:8080/api/getDatosInmuebleSUNARP/dQBzAHIAXwBtAGkAbgBkAGUAZgCnLE91r+YXQYwkoY5GVQRM/${codigoCUS}`);
    return this.http.get(`http://localhost:8080/api/getDatosInmuebleSUNARP/${token}/${codigoCUS}`)
      .pipe(map(response => {
        return response['s:Envelope']['s:Body']['GetDatosInmuebleResponse']['GetDatosInmuebleResult']['LinderosRegistrales']['LinderoInmueble'];
      }));
  }
}
