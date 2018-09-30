import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { cep } from "../../models/cep.dto";
import { API_CONFIG } from "../../Config/api.config";
import { Observable } from "rxjs";
import { Cidade } from "../../models/cidade.dto";
import { Estado } from "../../models/estado.dto";
import { CepCompleto } from "../../models/cepCompleto.dto";

@Injectable()
export class CepService{
    
    constructor(public http : HttpClient){
        
    }

    findByCep(cep : String) : Observable<cep>{
        return this.http.get<cep>(`${API_CONFIG.baseUrl}/ceps/buscacep/` + cep);
    }

    findByEstadoCidade(siglaEstado : string, cidade : string){
        return this.http.get<CepCompleto[]>(`${API_CONFIG.baseUrl}/ceps/buscacep/estado/${siglaEstado}/cidade/${cidade}`);
    }

    findByCidadeBairro(cidade : string,  bairro : string){
        return this.http.get<CepCompleto[]>(`${API_CONFIG.baseUrl}/ceps/buscacep/cidade/${cidade}/bairro/${bairro}`);
    }

    findEstados(){
        return this.http.get<Estado[]>(`${API_CONFIG.baseUrl}/ceps/buscacep/estados`);
    }

    findCidadesByEstado(siglaEstado : string){
        return this.http.get<Cidade[]>(`${API_CONFIG.baseUrl}/ceps/buscacep/cidadeEstado/${siglaEstado}`)
    }

    findAllCep() : Observable<cep[]>{
        return this.http.get<cep[]>(`${API_CONFIG.baseUrl}/ceps/buscacep/`);
    }

    

}