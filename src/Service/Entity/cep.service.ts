import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { cep } from "../../models/cep.dto";
import { API_CONFIG } from "../../Config/api.config";
import { Observable } from "rxjs";

@Injectable()
export class CepService{
    
    constructor(public http : HttpClient){
        
    }

    findByCep(cep : String) : Observable<cep>{
        return this.http.get<cep>(`${API_CONFIG.baseUrl}/ceps/buscacep/` + cep);
    }

    findAllCep() : Observable<cep[]>{
        return this.http.get<cep[]>(`${API_CONFIG.baseUrl}/ceps/buscacep/`);
    }

}