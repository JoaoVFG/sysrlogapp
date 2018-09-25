import { User } from "./user.dto";

export interface LoginResponse{
    user : User;
    token : string
}