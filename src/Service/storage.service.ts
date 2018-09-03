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
        
        localStorage.setItem('TOKEN', token);    
        localStorage.setItem('ID_USER', this.jwtHelper.decodeToken(tokenData).idUser);
        localStorage.setItem('EMAIL_USER', this.jwtHelper.decodeToken(tokenData).email);
        this.destroySecret();
    }

    retrieveToken() : string{
        return localStorage.getItem('TOKEN');
    }

    retriveEmail() : string{
    	return localStorage.getItem('EMAIL_USER');
    }

    retrieveIdUser(): string{
    	return localStorage.getItem('ID_USER');
    }

    
    eraseLocalStorage(){
    	localStorage.setItem('TOKEN',null);
    	localStorage.setItem('EMAIL_USER',null);
    	localStorage.setItem('ID_USER',null);
    }

    destroySecret(){
        localStorage.removeItem('SECRET');
    }

}    