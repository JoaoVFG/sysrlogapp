import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { listaEnderecoEntregaDTO } from "../models/rota/listaenderecoentrega.dto";
import { API_CONFIG } from "../Config/api.config";

@Injectable()
export class RotaService{

    constructor(public http : HttpClient){
        
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

        
}