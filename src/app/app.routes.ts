import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SearchComponent} from './components/search/search.component';
import {MadevisitComponent} from './components/madevisit/madevisit.component';
import {PlanedvisitComponent} from './components/planedvisit/planedvisit.component';
import {SecuritycamComponent} from './components/securitycam/securitycam.component';

const APP_ROUTES: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'search/:dni', component: SearchComponent},
  {path: 'visitasRealizadas', component: MadevisitComponent},
  {path: 'visitasProgramadas', component: PlanedvisitComponent},
  {path: 'camSecurity', component: SecuritycamComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
