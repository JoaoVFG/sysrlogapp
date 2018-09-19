import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { listaEnderecoEntregaDTO } from "../models/rota/listaenderecoentrega.dto";
import { API_CONFIG } from "../Config/api.config";
import { rotaResponse } from "../models/rota/rotaresponse.dto";
import { Observable } from "rxjs";
import { storageService } from "./storage.service";
import { RotaBuscaResponseDTO } from "../models/rota/RotaBuscaResponseDTO";

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

    findById(idRota : number) : Observable<RotaBuscaResponseDTO>{
        return this.http.get<RotaBuscaResponseDTO>(
            `${API_CONFIG.baseUrl}/rota/busca/id/` + idRota
        )
    }

    findByUser() : Observable<RotaBuscaResponseDTO[]>{
        return this.http.get<RotaBuscaResponseDTO[]>(
            `${API_CONFIG.baseUrl}/rota/busca/` + this.storage.retrieveIdUser()
        )
    }

        
}