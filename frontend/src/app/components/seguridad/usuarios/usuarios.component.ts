import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { LoginSeUsuario } from 'src/app/interfaces/loginseusuario';
import { SeUsuario } from 'src/app/interfaces/seusuario';
import { SeUsuarioService } from 'src/app/services/seusuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  listSeUsuarios: SeUsuario[] = [];
  formSeUsuario: FormGroup;
  idEmployee: number = 0;

  constructor(
    private _seusuarioService: SeUsuarioService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {

    this.formSeUsuario = this.formBuilder.group({
      xcodeemployee: ['', Validators.required],
      nrol: ['', Validators.required],
      xfirstname: ['', Validators.required],
      xlastname: ['', Validators.required],
      xusername: ['', Validators.required],
      xpassword: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getListSeUsuarios()
  }

  getListSeUsuarios() {
    this._seusuarioService.getListSeUsuarios().subscribe((data: SeUsuario[]) => {
      this.listSeUsuarios = data;
      this.listSeUsuarios.sort(
        (firstObject: SeUsuario, secondObject: SeUsuario) =>
    	  (firstObject.xfirstname > secondObject.xfirstname) ? 1 : -1
      );
    })
  }

  deleteSeUsuario(id: number) {
    this._seusuarioService.deleteSeUsuario(id).subscribe(() => {
      this.getListSeUsuarios();
      this.toastr.warning("El usuario fue eliminado con éxito", "Atención");
    })
  }

  saveSeUsuario() {
    const seusuario: SeUsuario = {
      xcodeemployee: this.formSeUsuario.value.xcodeemployee,
      nrol: this.formSeUsuario.value.nrol,
      xfirstname: this.formSeUsuario.value.xfirstname,
      xlastname: this.formSeUsuario.value.xlastname,
      xusername: this.formSeUsuario.value.xusername,
      xpassword: this.formSeUsuario.value.xpassword,
    }

    try {
      this._seusuarioService.saveSeUsuario(seusuario).subscribe(() => {
        this._seusuarioService.postLoginSeUsuario(seusuario)
          .pipe(catchError(err => {
            this.toastr.error(`Usuario ${seusuario.xusername} no ha podido ser registrado`, "Error")
            throw "Error: " + err
          }))
          .subscribe((data: SeUsuario) => {
            this.toastr.success(`${data.xfirstname} ${data.xlastname}<br>${data.xusername}</br>${data.nrol} | ${data.xcodeemployee}`, "Usuario Registrado");
            (document.getElementById('cancelAddModal') as HTMLInputElement).click();
          });

        this.getListSeUsuarios();
      });
    } catch (error) {
      console.log(error);
    }
  }

  editSeUsuario() {
    const seusuario: SeUsuario = {
      xcodeemployee: this.formSeUsuario.value.xcodeemployee,
      nrol: this.formSeUsuario.value.nrol,
      xfirstname: this.formSeUsuario.value.xfirstname,
      xlastname: this.formSeUsuario.value.xlastname,
      xusername: this.formSeUsuario.value.xusername,
      xpassword: this.formSeUsuario.value.xpassword,
    }

    console.log(seusuario);


    try {
      this._seusuarioService.updateSeUsuario(this.idEmployee!, seusuario).subscribe(() => {
        this.toastr.info(`El usuario ${seusuario.xusername} fue actualizado con éxito`);
        (document.getElementById('cancelEditModal') as HTMLInputElement).click();
        this.getListSeUsuarios();
      });
    } catch (error) {
      console.log(error);
    }
  }

  getSeUsuario(id: number) {
    this._seusuarioService.getSeUsuario(id).subscribe((seusuario: SeUsuario) => {
      this.formSeUsuario.patchValue({
        xcodeemployee: seusuario.xcodeemployee,
        nrol: seusuario.nrol,
        xfirstname: seusuario.xfirstname,
        xlastname: seusuario.xlastname,
        xusername: seusuario.xusername,
        xpassword: seusuario.xpassword
      });
      this.idEmployee = id;
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
    this.formSeUsuario.reset();
  }

}
