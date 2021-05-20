import {DEFAULT_CURRENCY_CODE, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {IconsProviderModule} from './icons-provider.module';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthService} from './core/serivce/auth.service';
import {LAZYLOAD_IMAGE_HOOKS, ScrollHooks} from 'ng-lazyload-image';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {ShareModule} from './module/customer/share/share.module';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        Ng2SearchPipeModule,
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
        CoreModule,
        ShareModule
    ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    {provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'VND'},
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
