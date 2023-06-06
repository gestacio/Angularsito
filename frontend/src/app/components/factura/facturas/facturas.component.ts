import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FaFactura } from 'src/app/interfaces/fafactura';
import { FaFacturaService } from 'src/app/services/fafactura.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent {
  listFaFacturas: FaFactura[] = []
  loading: boolean = false;

  constructor(private _productService: FaFacturaService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getListFaFacturas()
  }

  getListFaFacturas() {
    this.loading = true;
    this._productService.getListFaFacturas().subscribe((data: FaFactura[]) => {
      this.listFaFacturas = data;
      this.loading = false;
    })
  }

}
