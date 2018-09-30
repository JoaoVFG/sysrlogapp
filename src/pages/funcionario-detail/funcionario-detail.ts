import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Funcionario } from '../../models/funcionario.dto';
import { FuncionarioService } from '../../Service/Entity/funcionario.service';



@IonicPage()
@Component({
  selector: 'page-funcionario-detail',
  templateUrl: 'funcionario-detail.html',
})
export class FuncionarioDetailPage {

  funcionario : Funcionario
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public funcionarioService : FuncionarioService) {
      this.funcionario = this.navParams.get('funcionario');
     
      
    }

  ionViewDidLoad() {
    
  }

}
