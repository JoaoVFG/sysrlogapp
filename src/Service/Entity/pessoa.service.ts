import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../Config/api.config";
import { Observable } from "rxjs";
import { Pessoa } from "../../models/pessoa.dto";
import { InsertPessoaFisicaDTO } from "../../models/inserts/InsertPessoaFisica.dto"
import { InsertPessoaJuridicaDTO } from "../../models/inserts/InsertPessoaJuridica.dto"

@Injectable()
export class PessoaService{
    
    constructor(public http : HttpClient){

    }

    findById(id : string) : Observable<Pessoa>{
        return this.http.get<Pessoa>(`${API_CONFIG.baseUrl}/pessoa/buscapessoa/id/${id}`);
    }

    findAll() : Observable<Pessoa[]>{
    	return this.http.get<Pessoa[]>(`${API_CONFIG.baseUrl}/pessoa/buscapessoa/`);
    }

    findByTipo(tipo : string) : Observable<Pessoa[]>{
    	return this.http.get<Pessoa[]>(`${API_CONFIG.baseUrl}/buscapessoa/tipo/${tipo}`);
    }

    findByCpf(cpf : string) : Observable<Pessoa>{
    	return this.http.get<Pessoa>(`${API_CONFIG.baseUrl}/buscapessoa/cpf/${cpf}`);
    }

    findByCnpj(cnpj : string) : Observable<Pessoa>{
    	return this.http.get<Pessoa>(`${API_CONFIG.baseUrl}/buscapessoa/cnpj/${cnpj}`);
    }

    findByRazaoSocial(razaoSocial : string) : Observable<Pessoa[]>{
    	return this.http.get<Pessoa[]>(`${API_CONFIG.baseUrl}/buscapessoa/razaosocial/${razaoSocial}`);
    }


    insertPessoaFisica( insertPessoaFisica :InsertPessoaFisicaDTO ) {
    	return this.http.post(
            `${API_CONFIG.baseUrl}/pessoa/inserepf`,
            insertPessoaFisica,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    insertPessoaJuridica( insertPessoaJuridica : InsertPessoaJuridicaDTO){
		return this.http.post(
            `${API_CONFIG.baseUrl}/pessoa/inserepj`,
            insertPessoaJuridica,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    deletePessoa( id : string) {
    	return this.http.delete(`${API_CONFIG.baseUrl}/pessoa/` + id);
    }

    updatePessoa( updatePessoa : Pessoa):Observable<any>{
    	return this.http.put(`${API_CONFIG.baseUrl}/pessoa/update`,updatePessoa);
    }

}