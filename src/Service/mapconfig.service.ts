import { Injectable } from "@angular/core";
import { API_CONFIG } from "../Config/api.config";
import { HttpClient } from "@angular/common/http";
 
@Injectable()
export class mapConfigService{
    
    constructor(public http: HttpClient){
    
    }
    
    async findCrypto() {
            return await this.http.get(`${API_CONFIG.baseUrl}/configs/buscacrypto`,{
                                observe:'response',
                                responseType : 'text'
                            });
    }
}