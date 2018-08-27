import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { storageService } from '../Service/storage.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';

  pages: Array<{title: string, component: string}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
                public splashScreen: SplashScreen,
              public storage : storageService) {
    this.initializeApp();

    this.pages = [
      { title: 'Profile', component: 'ProfilePage' },
      { title: 'Logout', component: ''}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page : {title: string, component: string}) {
    switch(page.title){
      case 'Logout':
        this.logout();
        this.nav.setRoot('HomePage');
      break;
      
      default:
        this.nav.setRoot(page.component);

    }
  }

  logout(){
    this.storage.eraseLocalStorage();

  }
}
