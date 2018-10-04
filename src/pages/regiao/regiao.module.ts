import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegiaoPage } from './regiao';
import { RegiaoService } from '../../Service/Entity/regiao.service';

@NgModule({
  declarations: [
    RegiaoPage,
  ],
  imports: [
    IonicPageModule.forChild(RegiaoPage),
  ],
  providers : [
    RegiaoService
  ]
})
export class RegiaoPageModule {}
