import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { UserService } from '../../Service/Entity/user.service';
import { Role } from '../../models/role.dto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../models/user.dto';

/**
 * Generated class for the UserDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage {

  user: User;
  modo: string = 'consulta';
  allRoles: Role[];
  formGroup: FormGroup;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    public formBuilder: FormBuilder,
    public alertController : AlertController) {

    this.user = this.navParams.get('userDetail')
    this.verificarUndefined();

    this.formGroup = this.formBuilder.group({
      senha: [''],
      roles: [[]],
    })

  }

  ionViewDidLoad() {
    console.log('teste');
    
  }

  alterarUser() {
    let userUpdate : User = {
      email : this.user.email,
      id : this.user.id,
      pessoa : this.user.pessoa,
      senha : this.user.senha,
      roles : this.user.roles
    }

    if(this.formGroup.value.senha){
      userUpdate.senha = this.formGroup.value.senha
    }

    this.userService.updateUser(userUpdate)
      .subscribe(response => {

        this.user = userUpdate;
        this.showUpdateOk();
      }, error => {
        console.log(error);
        
      })
  
    
  }

  verificarUndefined() {
    if (!this.user) {
      this.navCtrl.setRoot('UserPage');
    }
  }

  alteraModo(newModo: string) {
    this.modo = newModo;
    if (this.modo == 'altera') {
      this.inicializarRoles();

    }
  }

  inicializarRoles() {
    this.userService.findRole()
      .subscribe(response => {
        let roles = response;
        this.user.roles.forEach(role => {

          let index = roles.findIndex(r => r.id == role.id)

          if (index != -1) {
            roles.splice(index, 1);
          }

          ;
          this.allRoles = roles;
        })

      })
  }

  removeRoleUser(role : Role){
    this.allRoles.push(role);
    let index = this.user.roles.findIndex(r => r.id == role.id);
    this.user.roles.splice(index, 1);
  }

  addRoleUser(role : Role){
    this.user.roles.push(role);
    let index = this.allRoles.findIndex(r => r.id == role.id);
    this.allRoles.splice(index, 1);
  }

  showUpdateOk() {
    let alert = this.alertController.create({
      title: 'Sucesso!',
      message: 'Usuário Alterado com sucesso!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'ok',
          handler: () => {
            this.alteraModo('consulta');
          }
        }
      ]
    });
    alert.present();
  }
}
