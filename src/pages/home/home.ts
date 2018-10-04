import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { loginDTO } from '../../models/login.dto';
import { loginService } from '../../Service/login.service';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { MyApp } from '../../app/app.component';
import { UserService } from '../../Service/Entity/user.service';
import { LoginResponse } from '../../models/loginResponse.dto';

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
    console.log('teste');
    
    this.loginService.authenticate(this.logindto)
      .subscribe(async response => {
        console.log(response);
        
        let loginResponse : LoginResponse = JSON.parse(response.body);

        
        this.loginService.sucessfullAuthentication(loginResponse);
        
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
