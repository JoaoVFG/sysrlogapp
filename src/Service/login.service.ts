import { Injectable } from "@angular/core";
import { loginDTO } from "../models/login.dto";
import { API_CONFIG } from "../Config/api.config";
import { HttpClient } from "@angular/common/http";
import { storageService } from "../Service/storage.service"
import { cryptService } from "./crypt.service";
import { UserService } from "./Entity/user.service";
import { LoginResponse } from "../models/loginResponse.dto";

 
@Injectable()
export class loginService{
    
    constructor(public http: HttpClient,
    			private storage: storageService,
                public crypt: cryptService,
                public userService : UserService){
    
    }

    authenticate(logindto : loginDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`, 
                            logindto,{
                                observe:'response',
                                responseType : 'text'
                            });
    }

    async sucessfullAuthentication(loginResponse : LoginResponse){
        this.crypt.initializeCryptValue();
        this.storage.saveToken(loginResponse.token);
        this.storage.saveUser(loginResponse.user);
    }

}