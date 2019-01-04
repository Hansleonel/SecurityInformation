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

  getPersonas() {
    return this.http.get('http://localhost:8080/api/invitado');
  }

  getPersona(numeroDniSearch: string) {
    return this.http.get(`http://localhost:8080/api/invitado/${numeroDniSearch}`);
  }

  getPersonasOrder() {
    return this.http.get(`http://localhost:8080/api/invitadoOrder?page=0&size=100`);
  }

  /*updateInvitado() {
    this.http.put('http://localhost:8080/api/invitado', this.invitado, httpOptions).subscribe(response => {
      console.log(response);
    });

  }*/
}

export interface DATOS {
  id_visita: number;
  cargo: string;
  fechavisita: string;
  fecharegistro: string;
  invitado: string;
}
