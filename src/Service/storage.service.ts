import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { cryptService } from "./crypt.service";


@Injectable()
export class storageService {
    

	jwtHelper: JwtHelper = new JwtHelper();

    constructor (public crypt : cryptService){
        
    }
    
    saveToken(token : string){
        this.crypt.initializeCryptValue();
		let tokenData = token.substring(7);

        localStorage.setItem('TOKEN', this.crypt.encrypt(token));
        localStorage.setItem('ID_USER', this.crypt.encrypt(this.jwtHelper.decodeToken(tokenData).sub));
        localStorage.setItem('EMAIL_USER', this.crypt.encrypt(this.jwtHelper.decodeToken(tokenData).email));
    }

    retrieveToken() : string{
        return this.crypt.decrypt(localStorage.getItem('TOKEN'));
    }

    retriveEmail() : string{
    	return this.crypt.decrypt(localStorage.getItem('EMAIL_USER'));
    }

    retrieveIdUser(): string{
    	return this.crypt.decrypt(localStorage.getItem('ID_USER'));
    }

    
    eraseLocalStorage(){
    	localStorage.removeItem('TOKEN');
    	localStorage.removeItem('EMAIL_USER');
    	localStorage.removeItem('ID_USER');
    }

    destroySecret(){
        localStorage.removeItem('SECRET');
    }

}    