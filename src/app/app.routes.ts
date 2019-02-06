import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SearchComponent} from './components/search/search.component';
import {MadevisitComponent} from './components/madevisit/madevisit.component';
import {PlanedvisitComponent} from './components/planedvisit/planedvisit.component';
import {SecuritycamComponent} from './components/securitycam/securitycam.component';
import {PersonComponent} from './components/person/person.component';
import {VisitdetailComponent} from './components/visitdetail/visitdetail.component';

const APP_ROUTES: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'search/:dni', component: SearchComponent},
  {path: 'visitasRealizadas', component: MadevisitComponent},
  {path: 'visitasProgramadas', component: PlanedvisitComponent},
  {path: 'detalleVisita/:idvisita', component: VisitdetailComponent},
  {path: 'personas', component: PersonComponent},
  {path: 'camSecurity', component: SecuritycamComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
