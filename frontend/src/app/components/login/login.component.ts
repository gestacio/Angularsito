import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SeUsuario } from 'src/app/interfaces/seusuario';
import { SeUsuarioService } from 'src/app/services/seusuario.service';
import { catchError } from 'rxjs/operators'
import { MaEmpresaService } from 'src/app/services/maempresa.service';
import { MaEmpresa } from 'src/app/interfaces/maempresa';
import { MaTiendaService } from 'src/app/services/matienda.service';
import { MaTienda } from 'src/app/interfaces/matienda';
import { LoginSeUsuario } from 'src/app/interfaces/loginseusuario';
import { SessionDataService } from 'src/app/services/sessiondata.service';
// import { LoginSessionDataService } from 'src/app/services/loginsessiondata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  isLogin: boolean = true;
  resSeUsuario!: SeUsuario;
  seusuarioSessionData: boolean = false;
  maempresaSessionData: boolean = false;
  matiendaSessionData: boolean = false;
  obj: any;
  sessionJson: any;


  constructor(
    private _seusuarioService: SeUsuarioService,
    private _sessionDataService: SessionDataService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,) {
    this.form = this.fb.group({
      xusername: ['', Validators.required],
      xpassword: ['', Validators.required],
    })
  }

  getSeUsuario() {
    const seusuario: LoginSeUsuario = {
      xusername: this.form.value.xusername,
      xpassword: this.form.value.xpassword,
    }

    this._seusuarioService.postLoginSeUsuario(seusuario)
      .pipe(catchError(err => {
        this.toastr.info(`Usuario ${seusuario.xusername} no encontrado o contraseña inválida`, "Error")
        throw "Error: " + err
      }))
      .subscribe((data: SeUsuario) => {
        this.resSeUsuario = data;

        this.obj = {
          'id': this.resSeUsuario.id,
          'serolId': this.resSeUsuario.serolId,
          'xfirstname': this.resSeUsuario.xfirstname,
          'xlastname': this.resSeUsuario.xlastname,
          'xusername': this.resSeUsuario.xusername,
        };

        this.sessionJson = JSON.stringify(this.obj)
        sessionStorage.setItem('SeUsuario', this.sessionJson);

        this._sessionDataService.getSessionData(803)
          .pipe(catchError(err => {
            console.log(err);
            throw "Error: " + err
          }))
          .subscribe((data: any) => {
            data = data.viewLoginSessionData;

            const objMaEmpresa = {
              'id': data.Expr3,
              'xrif': data.xrif,
              'xshortname': data.xshortname,
              'xlongname': data.xlongname,
              'xaddress': data.xaddress,
            };

            const objMaTienda = {
              'id': data.id,
              'idempresa': data.idempresa,
              'xname': data.xname,
              'nstore': data.nstore,
              'xtelf': data.xtelf,
              'xaddress': data.xaddress,
            };

            const sessionJsonMaEmpresa = JSON.stringify(objMaEmpresa)
            sessionStorage.setItem('MaEmpresa', sessionJsonMaEmpresa);

            const sessionJsonMaTienda = JSON.stringify(objMaTienda);
            sessionStorage.setItem('MaTienda', sessionJsonMaTienda);

            switch (this.resSeUsuario.serolId) {
              case 5: {
                this.router.navigate(['/caja'])
                break;
              }
              default: {
                this.router.navigate(['/inicio'])
                break;
              }
            }
          });


      })
  }
  // this.toastr.info(`Usuario ${this.form.value.xusuario} no encontrado`, "Error")

}
