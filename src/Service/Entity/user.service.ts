import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../Config/api.config";
import { Observable } from "rxjs";
import { User } from "../../models/user.dto";
import { Role } from "../../models/role.dto";
import { InsertLoginDTO } from "../../models/inserts/insertLogin.dto";
import { storageService } from "../storage.service";

@Injectable()
export class UserService{
    public user : User;
    constructor(public http : HttpClient,
                public storage : storageService){

    }

    findById(idUser : string){
        return this.http.get<User>(`${API_CONFIG.baseUrl}/user/buscauser/${idUser}`);
    }

    findByIdAsync(idUser : string){
        return this.http.get<User>(`${API_CONFIG.baseUrl}/user/buscauser/${idUser}`,{observe : 'response'});
    }

    findAll(){
        return this.http.get<User[]>(`${API_CONFIG.baseUrl}/user/buscauser/`);
    }

    findByEmail(email : string){
        return this.http.get<User>(`${API_CONFIG.baseUrl}/user/buscauser/email/${email}`);
    }

    findByEmpresa(idEmpresa : string){
        return this.http.get<User>(`${API_CONFIG.baseUrl}/user/buscauser/empresa/${idEmpresa}`);        
    }

    findRole(){
        return this.http.get<Role[]>(`${API_CONFIG.baseUrl}/user/buscarole`);
    }

    insertUser( insertLoginDTO : InsertLoginDTO ){
        return this.http.post(
            `${API_CONFIG.baseUrl}/login/create`,
            insertLoginDTO,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    deleteUser( idUser : string) {
    	return this.http.delete(`${API_CONFIG.baseUrl}/user/deleta/${idUser}`);
    }

    updateUser( updateUser : User):Observable<any>{
    	return this.http.put(`${API_CONFIG.baseUrl}/pessoa/updateuser$`,updateUser);
    }
    
}