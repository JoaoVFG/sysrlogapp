import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../Config/api.config";
import { Empresa } from "../../models/empresa.dto";
import { InsertEmpresa } from "../../models/inserts/insertEmpresa.dto";
import { Observable } from "rxjs/Observable";

@Injectable()
export class EmpresaService{

    constructor(public http : HttpClient){

    }

    findById(idEmpresa : string) : Observable<Empresa>{
        return this.http.get<Empresa>(`${API_CONFIG.baseUrl}/empresa/buscaempresa/${idEmpresa}`);
    }

    findAll() : Observable<Empresa[]>{
        return this.http.get<Empresa[]>(`${API_CONFIG.baseUrl}/empresa/buscaempresa`);
    }

    findByIdPessoa(idPessoa : string)  : Observable<Empresa>{
        return this.http.get<Empresa>(`${API_CONFIG.baseUrl}/empresa/buscaempresa/idpessoa/${idPessoa}`);
    }

    findByTipoEmpresa(idTipo : string) : Observable<Empresa[]> {
        return this.http.get<Empresa[]>(`${API_CONFIG.baseUrl}/empresa/buscaempresa/tipoempresa/${idTipo}`);
    }

    findTransportadoras() : Observable<Empresa[]>{
        return this.http.get<Empresa[]>(`${API_CONFIG.baseUrl}/empresa/buscaempresa/transportadoras`);
    }

    findByMatriz(idMatriz : string) : Observable<Empresa[]>{
        return  this.http.get<Empresa[]>(`${API_CONFIG.baseUrl}/empresa/buscaempresa/idmatriz/${idMatriz}`)
    }

    
    insertPessoaFisica( insertEmpresa :InsertEmpresa ) {
    	return this.http.post(
            `${API_CONFIG.baseUrl}/empresa/insere`,
            insertEmpresa,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }



    deletePessoa( id : string) {
    	return this.http.delete(`${API_CONFIG.baseUrl}/empresa/deleta/` + id);
    }

    updatePessoa(idEmpresa : string , updateEmpresa : InsertEmpresa):Observable<any>{
    	return this.http.put(`${API_CONFIG.baseUrl}/empresa/update/${idEmpresa}`,updateEmpresa);
    }
}