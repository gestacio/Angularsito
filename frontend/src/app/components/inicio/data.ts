import { VentaMensualPorMeses } from "src/app/interfaces/farmaciaOpalo";

export var multi = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "1990",
          "value": 62000000
        },
        {
          "name": "2010",
          "value": 73000000
        },
        {
          "name": "2011",
          "value": 89400000
        }
      ]
    },
  
    {
      "name": "USA",
      "series": [
        {
          "name": "1990",
          "value": 250000000
        },
        {
          "name": "2010",
          "value": 309000000
        },
        {
          "name": "2011",
          "value": 311000000
        }
      ]
    },
  
    {
      "name": "France",
      "series": [
        {
          "name": "1990",
          "value": 58000000
        },
        {
          "name": "2010",
          "value": 50000020
        },
        {
          "name": "2011",
          "value": 58000000
        }
      ]
    },
    {
      "name": "UK",
      "series": [
        {
          "name": "1990",
          "value": 57000000
        },
        {
          "name": "2010",
          "value": 62000000
        }
      ]
    }
  ];


  // single: FarmaciaOpalo[] = [
  //   // JSON.stringify(this.farmaciaOpalo),
  //   this.farmaciaOpalo
    
  //   // {
  //   //   "name": "Ópalo",
  //   //   "value": 500,
  //   // },
  //   // {
  //   //   "name": this.farmaciaOpalo.name ? this.farmaciaOpalo.name : "TotalUSA",
  //   //   "value": 5000000
  //   // },
  //   // {
  //   //   "name": "France",
  //   //   "value": 7200000
  //   // },
  //   //   {
  //   //   "name": "UK",
  //   //   "value": 6200000
  //   // }
  // ];

let getAnualVenta = [
    {
      "name": "Opalo",
      "series": [
        {
          "name": "Enero",
          "value": 12
        },
        {
          "name": "Febrero",
          "value": 20
        },
        {
          "name": "Marzo",
          "value": 50
        },
        {
          "name": "Abril",
          "value": 35
        },
        {
          "name": "Mayo",
          "value": 43
        },
        {
          "name": "Junio",
          "value": 50
        },
        {
          "name": "Julio",
          "value": 75
        },
        {
          "name": "Agosto",
          "value": 85
        },
        {
          "name": "Septiembre",
          "value": 72
        },
        {
          "name": "Octubre",
          "value": 56
        },
        {
          "name": "Noviembre",
          "value": 83
        },
        {
          "name": "Diciembre",
          "value": 125
        },
      ]
    },
  ];









export function formatearDataVentaMensualPorMeses(data: VentaMensualPorMeses) {
    while (data.series.length < 12) {
      
      if (data.series.length < 1) {
          data.series.push({
            "name": `Enero`,
            "value": 0
          });
          
        }
        if (data.series.length < 2) {
          data.series.push({
            "name": `Febrero`,
            "value": 0
          });
          
        }
        if (data.series.length < 3) {
          data.series.push({
            "name": `Marzo`,
            "value": 0
          });
          
        }
        if (data.series.length < 4) {
          data.series.push({
            "name": `Abril`,
            "value": 0
          });
          
        }
        if (data.series.length < 5) {
          data.series.push({
            "name": `Mayo`,
            "value": 0
          });
          
        }
        if (data.series.length < 6) {
          data.series.push({
            "name": `Junio`,
            "value": 0
          });
          
        }
        if (data.series.length < 7) {
          data.series.push({
            "name": `Julio`,
            "value": 0
          });
          
        }
        if (data.series.length < 8) {
          data.series.push({
            "name": `Agosto`,
            "value": 0
          });
          
        }
        if (data.series.length < 9) {
          data.series.push({
            "name": `Septiembre`,
            "value": 0
          });
          
        }
        if (data.series.length < 10) {
          data.series.push({
            "name": `Octubre`,
            "value": 0
          });
          
        }
        if (data.series.length < 11) {
          data.series.push({
            "name": `Noviembre`,
            "value": 0
          });
          
        }
        if (data.series.length < 12) {
          data.series.push({
            "name": `Diciembre`,
            "value": 0
          });
          
        }
      }

    return data
  }