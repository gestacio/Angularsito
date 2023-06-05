import { SeRol } from "./serol";

export interface SeUsuario {
    id?: number;
    xcodeemployee: string;
    xfirstname: string;
    xlastname: string;
    xusername: string;
    xpassword: string;
    createdAt?: Date;
    updatedAt?: Date;
    serolId: number;
    serol?: SeRol,
}