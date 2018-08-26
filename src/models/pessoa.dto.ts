import {tipoPessoa} from './tipoPessoa.dto'

export interface Pessoa{
    id : string;
    tipo : tipoPessoa;
    nome : string;
    razaoSocial : string;
    cpf : string;
    cnpj : string;
    dataNascimento : string;
    sexo : string;
}