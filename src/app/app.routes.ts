import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SearchComponent} from './components/search/search.component';
import {MadevisitComponent} from './components/madevisit/madevisit.component';
import {PlanedvisitComponent} from './components/planedvisit/planedvisit.component';
import {SecuritycamComponent} from './components/securitycam/securitycam.component';
import {PersonComponent} from './components/person/person.component';
import {VisitdetailComponent} from './components/visitdetail/visitdetail.component';
import {SelectionpideComponent} from './components/selectionpide/selectionpide.component';
import {Sbn01Component} from './components/pidecomponents/sbn/sbn01/sbn01.component';
import {MovimientoComponent} from './components/movimiento/movimiento.component';
import {SearchmovimientoComponent} from './components/searchmovimiento/searchmovimiento.component';
import {MovimientopersonaldetailComponent} from './components/movimientopersonaldetail/movimientopersonaldetail.component';

const APP_ROUTES: Routes = [
  {path: 'selectionPIDE', component: SelectionpideComponent},
  {path: 'home', component: HomeComponent},
  {path: 'search/:dni', component: SearchComponent},
  {path: 'movimiento', component: MovimientoComponent},
  {path: 'detalleMovimientoPersonal/:idRegistro', component: MovimientopersonaldetailComponent},
  {path: 'searchMovimiento/:dni', component: SearchmovimientoComponent},
  {path: 'visitasRealizadas', component: MadevisitComponent},
  {path: 'visitasProgramadas', component: PlanedvisitComponent},
  {path: 'detalleVisita/:idvisita', component: VisitdetailComponent},
  {path: 'personas', component: PersonComponent},
  {path: 'camSecurity', component: SecuritycamComponent},
  {path: 'sbn/sbn01', component: Sbn01Component},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
  // {path: '', pathMatch: 'full', redirectTo: 'selectionPIDE'},
  // {path: '**', pathMatch: 'full', redirectTo: 'selectionPIDE'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
