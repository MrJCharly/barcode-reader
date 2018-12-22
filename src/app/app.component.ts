import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html',
  providers: [ ScreenOrientation ]
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor (
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    screenOrientation: ScreenOrientation) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (!(platform.is('core') || platform.is('mobileweb'))) {
        screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
      }

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
