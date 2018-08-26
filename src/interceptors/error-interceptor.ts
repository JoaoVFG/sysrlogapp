import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { AlertController } from "ionic-angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public alert : AlertController){

    }

    intercept(req : HttpRequest<any>, next:HttpHandler) : Observable<HttpEvent<any>>{

        return next.handle(req)
            .catch((error, caught) =>{

                let errorObj = error;
                if(errorObj.error){
                    errorObj = errorObj.error;
                }
                
                if(!errorObj.status){
					errorObj = JSON.parse(errorObj);
                }
                
                switch(errorObj.status) {
                    case 403 :
                        this.showAlertFor403(errorObj);
                    break;

                    default :
                        this.showAlertForDefault(errorObj);
                    break;
                }
                

                return Observable.throw(errorObj);
            }) as any;
    }

    showAlertFor403(errorObj : any){
        let alert = this.alert.create({
            title: errorObj.status + ' - Erro de Permissão',
            message : errorObj.error + ' - ' + errorObj.message,
            enableBackdropDismiss: false,
            buttons:[
                {
                    text: 'Ok',
                }
            ]
        })
        alert.present();
    }

    
    showAlertForDefault(errorObj : any){
        let alert = this.alert.create({
            title: errorObj.status,
            message : errorObj.error + ' - ' + errorObj.message,
            enableBackdropDismiss: false,
            buttons:[
                {
                    text: 'Ok',
                }
            ]
        })
        alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};