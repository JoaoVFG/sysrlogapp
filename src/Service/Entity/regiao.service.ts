import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Regiao } from "../../models/regiao.dto";
import { API_CONFIG } from "../../Config/api.config";
import { InsertRegiaoByCepsDTO } from "../../models/regiao/InsertRegiaoByCeps.dto";
import { InsertRegiaoByBairroDTO } from "../../models/regiao/insertRegiaoByBairro.dto";
import { InsertRegiaoByCidadeDTO } from "../../models/regiao/InsertRegiaoByCidade.dto";

@Injectable()
export class RegiaoService{

    constructor(public http : HttpClient){

    }

    findAll(){
        return this.http.get<Regiao>(`${API_CONFIG.baseUrl}/regiao/buscaregiao`);
    }

    findByEmpresa(idEmpresa : string){
        return this.http.get<Regiao>(`${API_CONFIG.baseUrl}/regiao/buscaregiao/empresa/${idEmpresa}`);
    }

    findRegiaoesByEmpresaMatriz(idEmpresa : string){
        return this.http.get<Regiao[]>(`${API_CONFIG}/regiao/buscaregiao/empresamatriz/${idEmpresa}`);
    }

    deletaRegiao(idRota : string){
        return this.http.delete(`${API_CONFIG}/deleta/${idRota}`);
    }

    insertRegiaoByCidade( insertRegiaoByCidade : InsertRegiaoByCidadeDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/regiao/create/bycidade`,
            insertRegiaoByCidade,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    insertRegiaoByBairro( insertRegiaoByBairro : InsertRegiaoByBairroDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/regiao/create/bybairro`,
            insertRegiaoByBairro,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    insertRegiaoByCeps( insertRegiaoByCeps : InsertRegiaoByCepsDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/regiao/create/byceps`,
            insertRegiaoByCeps,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    update(regiao : Regiao){
        return this.http.put(`${API_CONFIG.baseUrl}/regiao/updateregiao`, regiao);
    }
}