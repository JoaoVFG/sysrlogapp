import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { storageService } from '../Service/storage.service';
import { MenuProvider } from '../providers/menu/menu';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';


  pages : any;  
  

  //Menu selecionado
  selectedMenu : any;

  constructor(
              
              public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public storage : storageService,
              public menuProvider: MenuProvider,
              public menuCtrl: MenuController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  
  openPage(page, index) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component) {
      this.nav.setRoot(page.component);
      this.menuCtrl.close();
    } else {
      if (this.selectedMenu) {
        this.selectedMenu = 0;
      } else {
        this.selectedMenu = index;
      }
    }
  }
  

  getSideMenuData() {  
    this.pages = this.menuProvider.getSideMenus();
  }

  logout(){
    this.storage.eraseLocalStorage();
    this.menuCtrl.close();
    this.menuProvider.closeMenu();
    this.nav.setRoot('HomePage');
  }

}
