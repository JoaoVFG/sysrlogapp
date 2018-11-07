import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { storageService } from '../Service/storage.service';
import { ValidacaoService } from '../Service/validacao.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';


  pages: any[];


  //Menu selecionado
  selectedMenu: any;

  constructor(

    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: storageService,
    public validacao : ValidacaoService,
    public menuCtrl: MenuController,
    public alert : AlertController) {
    this.initializeApp();

    this.pages = [{
      title: 'Profile', component: 'ProfilePage'
    }, {
      title: 'Rota',
      subPages: [{
        title: 'Gerar nova Rota',
        component: 'RotaPage',
      },
      {
        title: 'Rotas Geradas',
        component: 'RotasPage',
      }]
    },
    {
      title: 'Pessoa', component: 'PessoaPage'
    },
    {
      title: 'Endereco',
      subPages: [{
        title: 'Meu Endereco',
        component: 'EnderecoPage',
      }]
    },
    {
      title: 'Empresa',
      subPages: [{
        title: 'Empresa - Informacões',
        component: 'EmpresaPage',
      }]
    },
    {
      title: 'Cargos',
      component: 'CargoPage'
    },
    {
      title: 'Ceps',
      component: 'CepsPage'
    }, {
      title: 'Usuários',
      component: 'UserPage'
    },
    {
      title: 'Regiao',
      component: 'RegiaoPage'
    }
    ];


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

      if(this.validacao.validaPermissao(page.component)){
        this.nav.setRoot(page.component);
        this.menuCtrl.close();
      }else {
        this.showAlert();
      }
      
    } else {
      if (this.selectedMenu) {
        this.selectedMenu = 0;
      } else {
        this.selectedMenu = index;
      }
    }
  }



  async logout() {

    await this.menuCtrl.close();
    await this.nav.setRoot('HomePage');
    this.storage.eraseLocalStorage();
  }

  showAlert(){
    let alert = this.alert.create({
      title:'Erro de Permissão',
      message : 'Você não tem autirização para usar este recurso',
      enableBackdropDismiss: false,
      buttons:[
          {
              text: 'Ok',
          }
      ]
  })
  alert.present();
    
  }

}
