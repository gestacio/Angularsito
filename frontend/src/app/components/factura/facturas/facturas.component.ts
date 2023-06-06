import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FaFactura } from 'src/app/interfaces/fafactura';
import { FaFacturaService } from 'src/app/services/fafactura.service';
import { createPDF } from './emitirFactura';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent {
  listFaFacturas: FaFactura[] = []
  loading: boolean = false;

  constructor(
    private _fafacturaService: FaFacturaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getListFaFacturas()
  }

  getListFaFacturas() {
    this.loading = true;
    this._fafacturaService.getListFaFacturas().subscribe((data: FaFactura[]) => {
      this.listFaFacturas = data;
      this.loading = false;
    })
  }

  emitirFactura(id: number) {
    this._fafacturaService.generateFaFactura(id).subscribe((data: FaFactura) => {
      createPDF(data);
    });
  }

}
