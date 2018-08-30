import { ResponsavelRegiao } from "./responsavelregiao.dto";

export interface rotaResponse{
    rota : string;
    enderecoOrigem: string[],
    waypoints: string,
    responsavel : ResponsavelRegiao[];

}