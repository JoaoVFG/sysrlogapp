import { enderecoEntregaDTO } from "./enderecoentrega.dto";

export interface listaEnderecoEntregaDTO{
    idUser: string;
    waypoints : enderecoEntregaDTO[];
}