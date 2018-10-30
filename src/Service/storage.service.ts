import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { cryptService } from "./crypt.service";
import { User } from "../models/user.dto";


@Injectable()
export class storageService {
    

	jwtHelper: JwtHelper = new JwtHelper();

    constructor (public crypt : cryptService){
        
    }
    
    async saveToken(token : string){
		let tokenData = token.substring(7);
            
        localStorage.setItem('TOKEN', await this.crypt.encrypt(token));    
        localStorage.setItem('ID_USER', await this.jwtHelper.decodeToken(tokenData).idUser);
        localStorage.setItem('EMAIL_USER', await this.crypt.encrypt(this.jwtHelper.decodeToken(tokenData).email));

    }
    
    saveUser(user : User){

        localStorage.setItem('USER', this.crypt.encrypt(JSON.stringify(user)));
    }

    retrieveToken() : string{
        return this.crypt.decrypt(localStorage.getItem('TOKEN'));
    }

    retriveEmail() : string{
    	return this.crypt.decrypt(localStorage.getItem('EMAIL_USER'));
    }

    retrieveIdUser(): string{
    	return localStorage.getItem('ID_USER');
    }

    retrieveUser(): User{

    	return JSON.parse(this.crypt.decrypt(localStorage.getItem('USER')));
    }

    
    eraseLocalStorage(){
    	localStorage.setItem('TOKEN',null);
    	localStorage.setItem('EMAIL_USER',null);
        localStorage.setItem('ID_USER',null);
        localStorage.setItem('USER',null);
    }



}    