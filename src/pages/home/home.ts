import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { loginDTO } from '../../models/login.dto';
import { loginService } from '../../Service/login.service';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { cryptService } from '../../Service/crypt.service';

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
              public menu: MenuController) {
              
  }

  login(){
    console.log('teste');
    console.log(this.logindto.email);
    this.loginService.authenticate(this.logindto)
      .subscribe(response => {
        this.token = response.body.toString();
        this.loginService.sucessfullAuthentication(this.token);
        
        
        this.navCtrl.setRoot('ProfilePage');
      },
      error => {
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
