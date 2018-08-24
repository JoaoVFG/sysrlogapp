import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class storageService {
    

	jwtHelper: JwtHelper = new JwtHelper();

    constructor (){
        
    }
    
    saveToken(token : string){
		let tokenData = token.substring(7);

        localStorage.setItem('TOKEN', token);
       	localStorage.setItem('ID_USER', this.jwtHelper.decodeToken(tokenData).sub);
        localStorage.setItem('EMAIL_USER', this.jwtHelper.decodeToken(tokenData).email);
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
    	localStorage.removeItem('TOKEN');
    	localStorage.removeItem('EMAIL_USER');
    	localStorage.removeItem('ID_USER');
    }
}