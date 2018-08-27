import { LoadingController } from "ionic-angular";
import { Injectable } from "@angular/core";

@Injectable()
export class LoadingService{

    constructor(public loadingController: LoadingController){

    }

    presentLoading(){
        let loader = this.loadingController.create({
          content : "Aguarde..."
        });
        loader.present();
        return loader
    }

}