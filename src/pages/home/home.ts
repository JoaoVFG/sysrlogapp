import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { loginDTO } from '../../models/login.dto';
import { loginService } from '../../Service/login.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  logindto : loginDTO = {
    email:"",
    senha:""
  }
  
  token : string;
  constructor(public navCtrl: NavController,
              public loginService: loginService) {

  }

  login(){

    console.log(this.logindto);
    this.loginService.authenticate(this.logindto)
      .subscribe(response => {
        this.token = response.body.toString();
        console.log("FUNCIONOU" + this.token);
      })
  
  }

}
