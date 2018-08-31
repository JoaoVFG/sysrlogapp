import { Cidade } from '../models/cidade.dto'

export interface CepCompleto{
	id : number;
	cep : string;
	nomeRua : string;
	bairro : string;
	cidade : Cidade;
}