
export class GlobalConstants {
    public static xrif: String;
    public static xshortname: String;
    public static xlongname: String;
    public static xaddress: String;

    public static SEUSUARIO = JSON.parse(sessionStorage.getItem('SeUsuario')!);
    public static MAEMPRESA = JSON.parse(sessionStorage.getItem('MaEmpresa')!);
    public static MATIENDA = JSON.parse(sessionStorage.getItem('MaTienda')!);

}