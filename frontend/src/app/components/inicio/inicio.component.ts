import { Component } from '@angular/core';
import { FaFacturaService } from 'src/app/services/fafactura.service';
import { MaClienteService } from 'src/app/services/macliente.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  // listProducts: Product[] = []
  loading: boolean = false;
  cantidadProductos = 0;
  cantidadClientes = 0;
  cantidadFacturas = 0;

  view: [number, number] = [500, 250];
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  single = [
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
      "value": 6200000
    }
  ];

  constructor(
    private _productService: ProductService,
    private _maclienteService: MaClienteService,
    private _fafacturaService: FaFacturaService
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
      this.cantidadFacturas = data.countFaFacturas;
      this.loading = false;
    })
  }



}
