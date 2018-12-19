import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SucursalesesPage } from '../pages/sucursaleses/sucursaleses';
import { ItemsPage } from '../pages/items/items';
import { BarcodePage } from '../pages/barcode/barcode';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { GlobalProvider } from '../providers/global/global';
import { HttpClientModule } from '@angular/common/http';
import { UtilProvider } from '../providers/util/util';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SucursalesesPage,
    ItemsPage,
    BarcodePage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SucursalesesPage,
    ItemsPage,
    BarcodePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    GlobalProvider,
    UtilProvider
  ]
})
export class AppModule {}
