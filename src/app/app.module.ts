import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './components/home/home.component';
// TODO importando las rutas
import {APP_ROUTING} from './app.routes';
import {SearchComponent} from './components/search/search.component';
import {PlanedvisitComponent} from './components/planedvisit/planedvisit.component';
import {MadevisitComponent} from './components/madevisit/madevisit.component';

// TODO importando el HTTPCLIENTMODULE
import {HttpClientModule} from '@angular/common/http';

// TODO importando un PIPE
import {CapitalizadoPipe} from './pipes/capitalizado.pipe';
import {SecuritycamComponent} from './components/securitycam/securitycam.component';

import {GridModule} from '@syncfusion/ej2-angular-grids';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    NavbarComponent,
    HomeComponent,
    SearchComponent,
    PlanedvisitComponent,
    MadevisitComponent,
    // TODO los PIPES se definen en las declaraciones
    CapitalizadoPipe,
    SecuritycamComponent
  ],
  imports: [
    BrowserModule,
    // TODO declarando la importacion APP_ROUTING para las rutas
    APP_ROUTING,
    // TODO declarando el HTTPCLIENTMODULE para poder realizar peticiones
    HttpClientModule,
    GridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
