export interface FarmaciaOpalo {
    name: string;
    value: number;
}

export interface VentaMensualPorMeses {
    name: string;
    series: [
        {
            name: string,
            value: number,
        }
    ];
}