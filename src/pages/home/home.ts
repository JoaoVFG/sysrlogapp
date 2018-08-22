import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { loginDTO } from '../../models/login.dto';

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

  constructor(public navCtrl: NavController) {

  }

  login(){
    console.log(this.logindto);
  
  }

}
