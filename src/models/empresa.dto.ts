import { Pessoa } from "./pessoa.dto";
import { TipoEmpresa } from "./tipoEmpresa.dto";

export interface Empresa{
    id : string,
    pessoa : Pessoa,
    tipoEmpresa : TipoEmpresa,
    transportadora : string,
    empresaMatriz : string//corresponse ao código da pessoa
}