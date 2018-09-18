import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { listaEnderecoEntregaDTO } from "../models/rota/listaenderecoentrega.dto";
import { API_CONFIG } from "../Config/api.config";
import { rotaResponse } from "../models/rota/rotaresponse.dto";
import { Observable } from "rxjs";
import { storageService } from "./storage.service";

@Injectable()
export class RotaService{

    constructor(public http : HttpClient,
                public storage : storageService){
        
    }

    geraRotaJson(listaEnderecoEntregaDTO : listaEnderecoEntregaDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/rota/criarotajson`,
            listaEnderecoEntregaDTO,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

    findById(idRota : number) : Observable<rotaResponse>{
        return this.http.get<rotaResponse>(
            `${API_CONFIG.baseUrl}/rota/busca/id/` + idRota
        )
    }

    findByUser() : Observable<rotaResponse[]>{
        return this.http.get<rotaResponse[]>(
            `${API_CONFIG.baseUrl}/rota/busca/` + this.storage.retrieveIdUser()
        )
    }

        
}