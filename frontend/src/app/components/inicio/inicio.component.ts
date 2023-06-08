import { Component } from '@angular/core';
import { FaFactura } from 'src/app/interfaces/fafactura';
import { FarmaciaOpalo } from 'src/app/interfaces/farmaciaOpalo';
import { FaFacturaService } from 'src/app/services/fafactura.service';
import { MaClienteService } from 'src/app/services/macliente.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  listFaFacturas: FaFactura[] = []
  loading: boolean = false;
  cantidadProductos = 0;
  cantidadClientes = 0;
  cantidadFacturas = 0;
  countMensualFarmaciaOpalo: any;

  chartMetaMensual: any = {
    "view": [150, 150],
    "scheme": {domain: ['#148a9c', '#A10A28', '#C7B42C', '#AAAAAA']},
    "designedTotal": 100,
  }

  get VentaMensualFarciaOpalo() {
    return this.countMensualFarmaciaOpalo;
  }

  chartVentasPorMes: any = {
    scheme: {domain: ['#148a9c', '#A10A28', '#C7B42C', '#AAAAAA'],},
    legend:  false,
    showYAxisLabel: true,
    showXAxisLabel: true,
    showLabels: true,
    animations: true,
    xAxis: true,
    yAxis: true,
    xAxisLabel: 'Mes',
    yAxisLabel: 'Ventas',
    timeline: false,
    wrapTicks: true,
    legendTitle: "Venta Por Mes",
    roundDomains: "no funciona esta wea"
  }

  cardColor: string = '#232837';


  
  

  

  constructor(
    private _productService: ProductService,
    private _maclienteService: MaClienteService,
    private _fafacturaService: FaFacturaService,
  ) {
    // Object.assign(this, { single })

  }




  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));

  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
    this.getCountProducts()
    this.getCountMaClientes()
    this.getCountFaFacturas()
  }

  getCountProducts() {
    this.loading = true;
    this._productService.getCountProducts().subscribe((data: any) => {
      this.cantidadProductos = data.countProducts;
      this.loading = false;
    })
  }

  getCountMaClientes() {
    this.loading = true;
    this._maclienteService.getCountMaClientes().subscribe((data: any) => {
      this.cantidadClientes = data.countMaClientes;
      this.loading = false;
    })
  }

  getCountFaFacturas() {
    this.loading = true;
    this._fafacturaService.getCountFaFacturas().subscribe((data: any) => {
      this.cantidadFacturas = data.countAllFaFacturas;
      var arraysito: FarmaciaOpalo[] = [data.countThisMonthFaFacturas];
      this.countMensualFarmaciaOpalo = arraysito;
      this.loading = false;
    })
  }



  getAnualVenta = [
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


  view: any[] = [500, 400];
  legend: boolean = true;
  legendPosition: any = 'right';
  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  single: any = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
    {
      "name": "UK",
      "value": 5200000
    },
    {
      "name": "Italy",
      "value": 7700000
    },
    {
      "name": "Spain",
      "value": 4300000
    }
  ];

}
