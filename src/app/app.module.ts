import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { loginService } from '../Service/login.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { storageService } from '../Service/storage.service';
import { cryptService } from '../Service/crypt.service';
import { mapConfigService } from '../Service/mapconfig.service';
import { PessoaService } from '../Service/Entity/pessoa.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { LoadingService } from '../Service/Components/loading.service';
import { RotaService } from '../Service/rota.service';
import { CepService } from '../Service/Entity/cep.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RotaService,
    LoadingService,
    mapConfigService,
    cryptService,
    storageService,
    loginService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    PessoaService,
    CepService,
    PessoaService
    
  ]
})
export class AppModule { }
