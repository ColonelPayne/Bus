import { BrowserModule } from '@angular/platform-browser';
import {ElementRef, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing.module';
import {LeafletDirective, LeafletModule} from '@asymmetrik/ngx-leaflet';
import {MapDataService} from './core/services/mapData.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    LeafletModule.forRoot()
  ],
  providers: [MapDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
