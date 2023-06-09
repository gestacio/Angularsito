import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { SeRol } from 'src/app/interfaces/serol';
import { SeRolService } from 'src/app/services/serol.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  listSeRoles: SeRol[] = [];
  formSeRol: FormGroup;
  idEmployee: number = 0;

  constructor(
    private _serolService: SeRolService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {

    this.formSeRol = this.formBuilder.group({
      xrol: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getListSeRols()
  }

  getListSeRols() {
    this._serolService.getListSeRoles().subscribe((data: SeRol[]) => {
      this.listSeRoles = data;
      this.listSeRoles.sort(
        (firstObject: SeRol, secondObject: SeRol) =>
    	  (firstObject.id! > secondObject.id!) ? 1 : -1
      );
    })
  }

  deleteSeRol(id: number) {
    this._serolService.deleteSeRol(id).subscribe(() => {
      this.getListSeRols();
      this.toastr.warning("El usuario fue eliminado con éxito", "Atención");
    })
  }

  saveSeRol() {
    const serol: SeRol = {
      xrol: this.formSeRol.value.xrol,
    }

    try {
      this._serolService.saveSeRol(serol).subscribe(() => {
        this._serolService.getSeRolWhere(serol)
          .pipe(catchError(err => {
            this.toastr.error(`Usuario ${serol.xrol} no ha podido ser registrado`, "Error")
            throw "Error: " + err
          }))
          .subscribe((data: SeRol) => {
            this.toastr.success(`${data.xrol} `, "Rol Registrado");
            (document.getElementById('cancelAddModal') as HTMLInputElement).click();
          });

        this.getListSeRols();
      });
    } catch (error) {
      console.log(error);
    }
  }

  editSeRol() {
    const serol: SeRol = {
      xrol: this.formSeRol.value.xrol,
    }

    console.log(serol);


    try {
      this._serolService.updateSeRol(this.idEmployee!, serol).subscribe(() => {
        this.toastr.info(`El rol ${serol.xrol} fue actualizado con éxito`);
        (document.getElementById('cancelEditModal') as HTMLInputElement).click();
        this.getListSeRols();
      });
    } catch (error) {
      console.log(error);
    }
  }

  getSeRol(id: number) {
    this._serolService.getSeRol(id).subscribe((serol: SeRol) => {
      this.formSeRol.patchValue({
        xrol: serol.xrol,
      });
      this.idEmployee = id;
    })
  }

  clearForm() {
    this.formSeRol.reset();
  }
}
