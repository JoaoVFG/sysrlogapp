import { InsertLoginDTO } from '../inserts/insertLogin.dto'
import { InsertEnderecoDTO } from '../inserts/insertEndereco.dto'

export class InsertPessoaFisicaDTO{
	nome : string;
	tipo : number;
	cpf : string;
	dataNascimento : string;
	sexo : string;

	insertLoginDTO : InsertLoginDTO;
	insertEnderecoDTO : InsertEnderecoDTO;

}