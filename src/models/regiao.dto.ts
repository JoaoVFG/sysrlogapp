import { Empresa } from "./empresa.dto";
import { cep } from "./cep.dto";

export interface Regiao{
    id : string,
    descricao : string,
    empresa : Empresa,
    ceps : cep
}