import { CepCompleto } from '../models/cepCompleto.dto'
import { Pessoa } from '../models/pessoa.dto'

export interface Endereco{

	id : number;
	pessoa : Pessoa;
	idPessoa : string;
	cep: CepCompleto;
	numeroLogradouro : number;
	complemento : string;

}