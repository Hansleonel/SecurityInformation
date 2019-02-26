import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DnipersonaService {

  directioncalidad: string;

  constructor(private http: HttpClient) {


    this.directioncalidad = 'http://10.24.9.30:8080/mindef-starter-0.0.1-SNAPSHOT/api/';
  }

  getVisitas() {
    return this.http.get('http://10.24.9.78/mindef-starter-0.0.1-SNAPSHOT/api/visitas');
  }

  getPermisos(coduser, codapli, tokenuser) {
    return this.http.get(`http://10.24.9.78/mindef-starter-0.0.1-SNAPSHOT/api/empleadoMindefPermisos/${coduser}/${codapli}/${tokenuser}`);
  }

  getVisita(idVisista: string) {
    return this.http.get(`http://10.24.9.78/mindef-starter-0.0.1-SNAPSHOT/api/visitas/${idVisista}`);
  }

  getVisitasOrder() {
    return this.http.get('http://10.24.9.78/mindef-starter-0.0.1-SNAPSHOT/api/visitasOrder?page=0&size=100');
  }

  getReunionPersonas() {
    return this.http.get('http://10.24.9.78/mindef-starter-0.0.1-SNAPSHOT/api/reunionPersona');
  }

  getReunionPersonasOrder() {
    return this.http.get('http://10.24.9.78/mindef-starter-0.0.1-SNAPSHOT/api/reunionPersonaOrder');
  }

  getDatosDni(numeroDniHome: string) {
    return this.http.get(`http://10.24.9.78/mindef-starter-0.0.1-SNAPSHOT/api/dni/${numeroDniHome}`);
  }

  getAntecedentesPenales(numeroDniSearch: string) {
    return this.http.get(`http://10.24.9.78/mindef-starter-0.0.1-SNAPSHOT/api/antecedentesPenales/${numeroDniSearch}`);

  }

  getAntecedentesPoliciales(numeroDniSearch: string) {
    return this.http.get(`http://10.24.9.78/mindef-starter-0.0.1-SNAPSHOT/api/antecedentesPoliciales/${numeroDniSearch}`);
  }

  getAntecedentesJudiciales(numeroDniSearch: string) {
    return this.http.get(`http://10.24.9.78/mindef-starter-0.0.1-SNAPSHOT/api/antecedentesJudiciales/${numeroDniSearch}`);
  }

  getPersonas() {
    return this.http.get('http://10.24.9.78/mindef-starter-0.0.1-SNAPSHOT/api/invitado?page=0&size=100');
  }

  getPersona(numeroDniSearch: string) {
    return this.http.get(`http://10.24.9.78/mindef-starter-0.0.1-SNAPSHOT/api/invitado/${numeroDniSearch}`);
  }

  getPersonasOrder() {
    return this.http.get(`http://10.24.9.78/mindef-starter-0.0.1-SNAPSHOT/api/invitadoOrder?page=0&size=100`);
  }

  getVisitaByDni(dniNumero: string) {
    return this.http.get(`http://10.24.9.78/mindef-starter-0.0.1-SNAPSHOT/api/VisitaDni/${dniNumero}`);
  }

  getDatosByUser(usercod: string) {
    return this.http.get(`http://10.24.9.78/mindef-starter-0.0.1-SNAPSHOT/api/empleadoMindefDatos/${usercod}`);
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
