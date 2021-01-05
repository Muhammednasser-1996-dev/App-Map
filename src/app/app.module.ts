import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapAppComponent } from './map-app/map-app.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MapAppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA0B6tllChtrEQVKbJ72LWFq5IRy1qN3u0'
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule      

  ],
  // AIzaSyAwsSpAS7gv7AA00Ce8ljPKII6lbme6EbU
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
