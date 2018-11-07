import { Injectable } from "@angular/core";
import { storageService } from "./storage.service";
import { User } from "../models/user.dto";


@Injectable()
export class ValidacaoService {
    user: User = {
        apiKey: '',
        email: '',
        id: '',
        pessoa: undefined,
        roles: [],
        senha: ''
    }
    constructor(public storage: storageService) {

    }

    validaPermissao(pageComponent: String): boolean {
        let user = this.storage.retrieveUser();
        switch (pageComponent) {
            case 'ProfilePage':
                if (!(user.roles.findIndex(r => r.id == '33') == -1)) {
                    return true;
                }
                break;
            case 'RotaPage':
                if (!(user.roles.findIndex(r => r.id == '33') == -1)) {
                    return true;
                }
                break;
            case 'RotasPage':
                if (!(user.roles.findIndex(r => r.id == '33') == -1)) {
                    return true;
                }
                break;
            case 'PessoaPage':
                if (!(user.roles.findIndex(r => r.id == '33') == -1)) {
                    return true;
                }
                break;
            case 'EnderecoPage':
                if (!(user.roles.findIndex(r => r.id == '36') == -1)) {
                    return true;
                }
                break;
            case 'EmpresaPage':
                if (!(user.roles.findIndex(r => r.id == '35') == -1)) {
                    return true;
                }
                break;
            case 'CargoPage':
                if (!(user.roles.findIndex(r => r.id == '4') == -1)) {
                    return true;
                }
                break;
            case 'CepsPage':
                if (!(user.roles.findIndex(r => r.id == '33') == -1)) {
                    return true;
                }
                break;
            case 'UserPage':
                if (!(user.roles.findIndex(r => r.id == '31') == -1)) {
                    return true;
                }
                break;
            case 'RegiaoPage':
                if (!(user.roles.findIndex(r => r.id == '27') == -1)) {
                    return true;
                }
                break;
            default:
                console.log('NENHUMA DAS OPÇÕES');
                return false;
        }
    }

} 