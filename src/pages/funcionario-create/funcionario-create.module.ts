import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuncionarioCreatePage } from './funcionario-create';

@NgModule({
  declarations: [
    FuncionarioCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(FuncionarioCreatePage),
  ],
})
export class FuncionarioCreatePageModule {}
