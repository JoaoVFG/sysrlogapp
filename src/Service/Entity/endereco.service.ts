import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../Config/api.config";
import { Observable } from "rxjs";
import { Endereco } from "../../models/endereco.dto"
import { InsertEnderecoDTO } from "../../models/inserts/insertEndereco.dto";

@Injectable()
export class EnderecoService{

	constructor(public http : HttpClient){

    }
    
    findById(id : string) : Observable<Endereco>{
        return this.http.get<Endereco>(`${API_CONFIG.baseUrl}/endereco/buscaendereco/${id}`);
    }

    findAll() : Observable<Endereco[]>{
    	return this.http.get<Endereco[]>(`${API_CONFIG.baseUrl}/endereco/buscaendereco`);
    }

    findByPessoa(idPessoa : string) : Observable<Endereco>{
        return this.http.get<Endereco>(`${API_CONFIG.baseUrl}/endereco/buscaendereco/pessoa/${idPessoa}`);
    }

    
    findByCep(cep : string) : Observable<Endereco[]>{
    	return this.http.get<Endereco[]>(`${API_CONFIG.baseUrl}/endereco/buscaendereco/${cep}`);
    }

    insertEndereco(insertEnderecoDTO : InsertEnderecoDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/endereco`,
            insertEnderecoDTO,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    deleteEndereco( idEndereco : string ){
        return this.http.delete(`${API_CONFIG.baseUrl}/endereco/` + idEndereco);
    }

    updateEndereco( idEndereco : number, enderecoUpdate : InsertEnderecoDTO){
        return this.http.put(`${API_CONFIG.baseUrl}/endereco/update/${idEndereco}`,enderecoUpdate);
    }

}