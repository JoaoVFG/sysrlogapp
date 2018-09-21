import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../Config/api.config";
import { Funcionario } from "../../models/funcionario.dto";
import { Observable } from "rxjs";
import { InsertFuncionario } from "../../models/inserts/insertFuncionario.dto";

@Injectable()
export class FuncionarioService{

    constructor(public http : HttpClient){

    }

    findById(idFuncinario : string) : Observable<Funcionario>{
        return this.http.get<Funcionario>(`${API_CONFIG.baseUrl}/buscafuncionario/` + idFuncinario);
    }

    findAll(): Observable<Funcionario[]>{
        return this.http.get<Funcionario[]>(`${API_CONFIG.baseUrl}/funcionario/buscafuncionario`);
    }

    findByPessoa(id : string) : Observable<Funcionario>{
        return this.http.get<Funcionario>(`${API_CONFIG.baseUrl}/funcionario/buscafuncionario/pessoa/${id}`);
    }

    findByEmpresa(id : string) : Observable<Funcionario[]>{
        return this.http.get<Funcionario[]>(`${API_CONFIG.baseUrl}/funcionario/buscafuncionario/empresa/${id}`);
    }

    findByEmpresaAndCargo(idEmpresa : string, idCargo : string) : Observable<Funcionario[]>{
        return this.http.get<Funcionario[]>(`${API_CONFIG.baseUrl}/funcionario/buscafuncionario/empresa/${idEmpresa}/cargo/${idCargo}`);
    }


    insertFuncionario( insertFuncionario : InsertFuncionario){
		return this.http.post(
            `${API_CONFIG.baseUrl}/funcionario/insere`,
            insertFuncionario,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    deletePessoa( id : string) {
    	return this.http.delete(`${API_CONFIG.baseUrl}/funcionario/deleta/${id}`);
    }

    updateFuncionario( id : string, updateFuncionario : InsertFuncionario):Observable<any>{
    	return this.http.put(`${API_CONFIG.baseUrl}/funcionario/update/${id}`,updateFuncionario);
    }

}