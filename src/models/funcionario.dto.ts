import { Pessoa } from "./pessoa.dto";
import { Empresa } from "./empresa.dto";
import { Cargo } from "./cargo.dto";

export interface Funcionario{
    id : string,
    pessoa : Pessoa,
    empresa : Empresa,
    cargo : Cargo
}