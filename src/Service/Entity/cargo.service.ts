import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Cargo } from "../../models/cargo.dto";
import { API_CONFIG } from "../../Config/api.config";

@Injectable()
export class CargoService{

    constructor(public http : HttpClient){

    }

    findById(id : string) : Observable<Cargo>{
        return this.http.get<Cargo>(`${API_CONFIG.baseUrl}/cargo/buscacargo/${id}`);
    }

    findAll() : Observable<Cargo[]>{
        return this.http.get<Cargo[]>(`${API_CONFIG.baseUrl}/cargo/buscacargo`);
    }

    insertCargo( descricao : string){
		return this.http.post(
            `${API_CONFIG.baseUrl}/cargo/insert/${descricao}`,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}