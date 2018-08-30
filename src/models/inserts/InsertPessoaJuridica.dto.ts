import { InsertLoginDTO } from '../inserts/insertLogin.dto'
import { InsertEnderecoDTO } from '../inserts/insertEndereco.dto'

export class InsertPessoaJuridicaDTO {
	tipo : number;
	razaoSocial : string;
	cnpj : string;
	
	insertLoginDTO : InsertLoginDTO;
	insertEnderecoDTO : InsertEnderecoDTO;
}