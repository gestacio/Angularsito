import { FaVenta } from "./faventa";
import { MaCliente } from "./macliente";
import { MaEmpresa } from "./maempresa";
import { MaTienda } from "./matienda";
import { SeUsuario } from "./seusuario";

export interface FaFactura {
    id?: number;
    ncaja: number;
    mneto: number;
    niva: number;
    mtotal: number;
    maempresaId: number;
    matiendaId: number;
    maclienteId: number;
    seusuarioId: number;
    maempresa?: MaEmpresa;
    matienda?: MaTienda;
    macliente?: MaCliente;
    seusuario?: SeUsuario;
    faventa?: FaVenta[];
    createdAt?: Date;
    updatedAt?: Date;
}