import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { loginDTO } from '../../models/login.dto';
import { loginService } from '../../Service/login.service';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { MyApp } from '../../app/app.component';
import { UserService } from '../../Service/Entity/user.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  logindto : loginDTO = {
    email : '',
    senha:'',
   }
  
  token : string;
  constructor(public navCtrl: NavController,
              public loginService: loginService,
              public userService : UserService,
              public menu: MenuController,
              public app: MyApp) {
              
  }

  async login(){

    this.loginService.authenticate(this.logindto)
      .subscribe(async response => {
        this.token = response.body.toString();
        
        await this.loginService.sucessfullAuthentication(this.token);
        
        this.app.getSideMenuData();

        this.navCtrl.setRoot('ProfilePage');
      },
      error => {
        console.log(error);
      })
  }

  signup(){
    this.navCtrl.push('SignupPage');
  }
  
  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave(){
    this.menu.swipeEnable(true);
  }

}
