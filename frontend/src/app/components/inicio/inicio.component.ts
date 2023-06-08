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


  view: [number, number] = [600, 250];
  viewMetaMensual: [number, number] = [150, 150];
  designatedTotal: number = 100;
  // options
  // gradient: boolean = true;
  // showLegend: boolean = true;
  // showLabels: boolean = true;
  // isDoughnut: boolean = false;

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Mes';
  yAxisLabel: string = 'Ventas';
  timeline: boolean = true;
  wrapTicks: boolean = true;

  colorScheme: any = {
    domain: ['#148a9c', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  cardColor: string = '#232837';

  farmaciaOpalo!: FarmaciaOpalo
  
  single: FarmaciaOpalo[] = [
    // JSON.stringify(this.farmaciaOpalo),
    this.farmaciaOpalo
    
    // {
    //   "name": "Ópalo",
    //   "value": 500,
    // },
    // {
    //   "name": this.farmaciaOpalo.name ? this.farmaciaOpalo.name : "TotalUSA",
    //   "value": 5000000
    // },
    // {
    //   "name": "France",
    //   "value": 7200000
    // },
    //   {
    //   "name": "UK",
    //   "value": 6200000
    // }
  ];

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
    this.getFacturas();
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
    this._fafacturaService.getCountFaFacturas().subscribe((data: FarmaciaOpalo) => {
      this.cantidadFacturas = data.value;
      console.log("agregando");
      this.farmaciaOpalo = data;
      this.single.push(this.farmaciaOpalo)
      console.log(this.farmaciaOpalo);

      this.loading = false;
    })
  }

  getFacturas() {
    this._fafacturaService.getListFaFacturas().subscribe((data: FaFactura[]) => {
      this.listFaFacturas = data;
      // console.log(this.listFaFacturas);
    });
  }

  multi = [
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



}
