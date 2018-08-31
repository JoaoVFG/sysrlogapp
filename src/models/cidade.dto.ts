import { Estado } from '../models/estado.dto'

export interface Cidade{
	id : number;
	nome : string;
	estado : Estado;
}