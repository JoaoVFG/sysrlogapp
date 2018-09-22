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

  //pages: Array<{title: string, component: string}>;
  
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
    /**
    this.pages = [
      { title: 'Profile', component: 'ProfilePage' },
      { title: 'Rota', component: 'RotaPage'},
      { title: 'Logout', component: ''}
    ];
    */
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.getSideMenuData();
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
  
  /**
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
   */
  getSideMenuData() {
    console.log('CARREGANDO MENU');
    
    this.pages = this.menuProvider.getSideMenus();
  }

  logout(){
    this.storage.eraseLocalStorage();
    this.menuCtrl.close();
    this.nav.setRoot('HomePage');
  }
}
