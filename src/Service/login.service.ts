import { Injectable } from "@angular/core";
import { loginDTO } from "../models/login.dto";
import { API_CONFIG } from "../Config/api.config";
import { HttpClient } from "@angular/common/http";
import { storageService } from "../Service/storage.service"
 
@Injectable()
export class loginService{
    
    constructor(public http: HttpClient,
    			private storage: storageService){
    
    }

    authenticate(logindto : loginDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/login`, 
                            logindto,{
                                observe:'response',
                                responseType : 'text'
                            });
    }

    sucessfullAuthentication(token : string){
        this.storage.saveToken(token);
    }
}