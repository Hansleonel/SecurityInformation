import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DnipersonaService {

  constructor(private http: HttpClient) {
  }

  getVisitas() {
    return this.http.get('http://localhost:8080/api/visitas');
  }

  getReunionPersonas() {
    return this.http.get('http://localhost:8080/api/reunionPersona');
  }

  getDatosDni(numeroDniHome: string) {
    return this.http.get(`http://localhost:8080/api/dni/${numeroDniHome}`);
  }

  getAntecedentesPenales(numeroDniSearch: string) {
    return this.http.get(`http://localhost:8080/api/antecedentesPenales/${numeroDniSearch}`);

  }

  getAntecedentesPoliciales(numeroDniSearch: string) {
    return this.http.get(`http://localhost:8080/api/antecedentesPoliciales/${numeroDniSearch}`);
  }

  getAntecedentesJudiciales(numeroDniSearch: string) {
    return this.http.get(`http://localhost:8080/api/antecedentesJudiciales/${numeroDniSearch}`);
  }
}
