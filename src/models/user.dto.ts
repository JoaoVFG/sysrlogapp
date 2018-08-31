import { Pessoa } from "./pessoa.dto";
import { Role } from "./role.dto";

export interface User{
    id : string;
    email : string;
    senha : string;
    Pessoa : Pessoa;
    roles : Role[];
}