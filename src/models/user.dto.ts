import { Pessoa } from "./pessoa.dto";
import { Role } from "./role.dto";

export interface User{
    id : string;
    email : string;
    senha : string;
    pessoa : Pessoa;
    roles : Role[];
    apiKey : string;
}