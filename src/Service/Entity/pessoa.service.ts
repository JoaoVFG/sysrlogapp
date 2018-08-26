import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { storageService } from "../storage.service";
import { API_CONFIG } from "../../Config/api.config";
import { Pessoa } from "../../models/pessoa.dto";
import { Observable } from "rxjs";

@Injectable()
export class PessoaService{
    
    constructor(public http : HttpClient,
                public storage : storageService){

    }

    findById(id : string) : Observable<Pessoa>{
        return this.http.get<Pessoa>(`${API_CONFIG.baseUrl}/pessoa/buscapessoa/` + id);
    }

}