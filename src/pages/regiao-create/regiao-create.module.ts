import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegiaoCreatePage } from './regiao-create';
import { RegiaoService } from '../../Service/Entity/regiao.service';

@NgModule({
  declarations: [
    RegiaoCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(RegiaoCreatePage),
  ],
  providers:[
    RegiaoService
  ]
})
export class RegiaoCreatePageModule {}
