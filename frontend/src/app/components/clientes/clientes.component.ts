import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { MaCliente } from 'src/app/interfaces/macliente';
import { MaClienteService } from 'src/app/services/macliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  listMaClientes: MaCliente[] = [];
  formMaCliente: FormGroup;
  idEmployee: number = 0;

  constructor(
    private _maclienteService: MaClienteService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {

    this.formMaCliente = this.formBuilder.group({
      xbusinessname: ['', Validators.required],
      xdni: ['', Validators.required],
      xtelf: ['', Validators.required],
      xshortaddress: ['', Validators.required],
      xlongaddress: [''],
    })
  }

  ngOnInit(): void {
    this.getListMaClientes()
  }

  getListMaClientes() {
    this._maclienteService.getListMaClientes().subscribe((data: MaCliente[]) => {
      this.listMaClientes = data;
      
      this.listMaClientes.sort(
        (firstObject: MaCliente, secondObject: MaCliente) =>
    	  (firstObject.xbusinessname > secondObject.xbusinessname) ? 1 : -1
      );
    })
  }

  deleteMaCliente(id: number) {
    this._maclienteService.deleteMaCliente(id).subscribe(() => {
      this.getListMaClientes();
      this.toastr.warning("El usuario fue eliminado con éxito", "Atención");
    })
  }

  saveMaCliente() {
    let dniCliente = this.formMaCliente.value.xdni;

    if (dniCliente.length > 8) {
      this.formMaCliente.value.xdni = 'J' + dniCliente;
    } else if (parseInt(dniCliente) >= 80000000) {
      this.formMaCliente.value.xdni = 'E' + dniCliente;
    } else {
      this.formMaCliente.value.xdni = 'V' + dniCliente;
    }

    const macliente: MaCliente = {
      xbusinessname: this.formMaCliente.value.xbusinessname,
      xdni: this.formMaCliente.value.xdni,
      xtelf: this.formMaCliente.value.xtelf,
      xshortaddress: this.formMaCliente.value.xshortaddress,
      xlongaddress: this.formMaCliente.value.xlongaddress,
    }

    try {
      this._maclienteService.saveMaCliente(macliente)
      .pipe(catchError(err => {
        this.toastr.error(`Usuario ${macliente.xbusinessname} no ha podido ser registrado`, "Error")
        throw "Error: " + err
      }))
      .subscribe(() => {
        this.toastr.success(`Cliente ${macliente.xbusinessname} registrado.`);
        (document.getElementById('cancelAddModal') as HTMLInputElement).click();
        this.getListMaClientes();
      });
      
    } catch (error) {
      console.log(error);
    }
  }

  editMaCliente() {
    let dniCliente = this.formMaCliente.value.xdni;

    if (dniCliente.length > 8) {
      this.formMaCliente.value.xdni = 'J' + dniCliente;
    } else if (parseInt(dniCliente) >= 80000000) {
      this.formMaCliente.value.xdni = 'E' + dniCliente;
    } else {
      this.formMaCliente.value.xdni = 'V' + dniCliente;
    }

    const macliente: MaCliente = {
      xbusinessname: this.formMaCliente.value.xbusinessname,
      xdni: this.formMaCliente.value.xdni,
      xtelf: this.formMaCliente.value.xtelf,
      xshortaddress: this.formMaCliente.value.xshortaddress,
      xlongaddress: this.formMaCliente.value.xlongaddress,
    }

    try {
      this._maclienteService.updateMaCliente(this.idEmployee!, macliente).subscribe(() => {
        this.toastr.info(`El usuario ${macliente.xbusinessname} fue actualizado con éxito`);
        (document.getElementById('cancelEditModal') as HTMLInputElement).click();
        this.getListMaClientes();
      });
    } catch (error) {
      console.log(error);
    }
  }

  getMaCliente(xdni: string) {
    this._maclienteService.getMaCliente(xdni).subscribe((macliente: MaCliente) => {
      this.formMaCliente.patchValue({
        xbusinessname: macliente.xbusinessname,
        xdni: macliente.xdni,
        xtelf: macliente.xtelf,
        xshortaddress: macliente.xshortaddress,
        xlongaddress: macliente.xlongaddress
      });

      this.idEmployee = macliente.id!;
    })
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  clearForm() {
    this.formMaCliente.reset();
  }

}
