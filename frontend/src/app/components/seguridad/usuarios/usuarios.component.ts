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
    })
  }

  deleteSeUsuario(id: number) {
    this._seusuarioService.deleteSeUsuario(id).subscribe(() => {
      this.getListSeUsuarios();
      this.toastr.warning("El producto fue eliminado con éxito", "Atención");
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

    const getWhereSeUsuario: LoginSeUsuario = {
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
            this.toastr.success(`${seusuario.xusername} </br>${seusuario.xcodeemployee}<br>${seusuario.nrol}`, "Usuario Registrado");
            (document.getElementById('cancelModal') as HTMLInputElement).click();
          });

          this.getListSeUsuarios();
      });
    } catch (error) {
      console.log(error);
    }
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
