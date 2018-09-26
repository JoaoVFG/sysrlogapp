import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmpresaCreatePage } from './empresa-create';

@NgModule({
  declarations: [
    EmpresaCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(EmpresaCreatePage),
  ],
})
export class EmpresaCreatePageModule {}
