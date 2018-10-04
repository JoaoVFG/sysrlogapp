import { Empresa } from "./empresa.dto";
import { CepCompleto } from "./cepCompleto.dto";

export interface Regiao{
    id : string,
    descricao : string,
    empresa : Empresa,
    ceps : CepCompleto[]
}