import { Component } from '@angular/core';
import { FaFactura } from 'src/app/interfaces/fafactura';
import { FarmaciaOpalo, VentaMensualPorMeses } from 'src/app/interfaces/farmaciaOpalo';
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
  countMonthsFaFacturas: any;
  countMonthStoresFaFacturas: any;

  chartMetaMensual: any = {
    "view": [150, 150],
    "scheme": { domain: ['#148a9c', '#A10A28', '#C7B42C', '#AAAAAA'] },
    "designedTotal": 100,
  }

  chartVentasPorMes: any = {
    scheme: { domain: ['#148a9c', '#A10A28', '#C7B42C', '#AAAAAA'], },
    legend: false,
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
    roundDomains: "no funciona esta wea",
  }

  chartResumenMetasTiendas: any = {
    view: [500, 400],
    legend:true,
    legendPosition: 'right',
    scheme: {domain: ['#148a9c', '#28a745', '#ffc107', '#dc3545', '#888', '#f7f7f9']},
    "designedTotal": 100,
  }

  get VentaMensualFarciaOpalo() {
    return this.countMensualFarmaciaOpalo;
  }

  get VentaPorMesFarmaciaOpalo() {
    return this.countMonthsFaFacturas;
  }

  get VentaMensualPorTiendas() {
    return this.countMonthStoresFaFacturas;
  }

  







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
    this.getCountMonthsFaFacturas()
    this.getCountMonthStoresFaFacturas()
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

  getCountMonthsFaFacturas() {
    this.loading = true;
    this._fafacturaService.getCountMonthsFaFacturas().subscribe((data: VentaMensualPorMeses) => {
      data = this.formatearDataVentaMensualPorMeses(data)
      var arraysito: VentaMensualPorMeses[] = [data];
      this.countMonthsFaFacturas = arraysito;

      this.loading = false;
    })
  }

  getCountMonthStoresFaFacturas() {
    this.loading = true;
    this._fafacturaService.getCountMonthStoresFaFacturas().subscribe((data: any) => {
      // var arraysito = [data];
      this.countMonthStoresFaFacturas = data;
      console.log(this.countMonthStoresFaFacturas);

      this.loading = false;
    })
    
  }





  
  single: any = [
    {
      "name": "Opalo",
      "value": 20
    },
    {
      "name": "Jeanine",
      "value": 30
    },
    {
      "name": "Valerie",
      "value": 50
    },
    {
      "name": "Roy",
      "value": 90
    },
    {
      "name": "Ron",
      "value": 75
    },
    
  ];








  formatearDataVentaMensualPorMeses(data: VentaMensualPorMeses) {
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

}
