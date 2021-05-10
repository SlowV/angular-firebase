import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {IconsProviderModule} from './icons-provider.module';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {Spinner} from './core/filter/spinner.interceptor';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthService} from './core/serivce/auth.service';
import {LAZYLOAD_IMAGE_HOOKS, ScrollHooks} from 'ng-lazyload-image';
import {NgAisModule} from 'angular-instantsearch';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // NgAisModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud'),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    CoreModule
  ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    {provide: HTTP_INTERCEPTORS, useClass: Spinner, multi: true},
    {provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks},
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
