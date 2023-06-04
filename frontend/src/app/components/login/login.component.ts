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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  isLogin: boolean = true;
  resSeUsuario!: SeUsuario;
  

  constructor(
    private _seusuarioService: SeUsuarioService,
    private _maempresaService: MaEmpresaService,
    private _matiendaService: MaTiendaService,
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
        this.setSessionData();
        this.router.navigate(['/products'])
      })
    // this.toastr.info(`Usuario ${this.form.value.xusuario} no encontrado`, "Error")

  }

  setSessionData() {
      const obj = {
        'nrol': this.resSeUsuario.nrol,
        'xfirstname': this.resSeUsuario.xfirstname,
        'xlastname': this.resSeUsuario.xlastname,
        'xusername': this.resSeUsuario.xusername,
      };
      
      const sessionJson = JSON.stringify(obj)
      sessionStorage.setItem('SeUsuario', sessionJson);
    

    this._maempresaService.getMaEmpresa().subscribe((data: MaEmpresa) => {

      const obj = {
        'xrif': data.xrif,
        'xshortname': data.xshortname,
        'xlongname': data.xlongname,
        'xaddress': data.xaddress,
      };

      const sessionJson = JSON.stringify(obj)
      sessionStorage.setItem('MaEmpresa', sessionJson);
    })

    this._matiendaService.getMaTienda(2189).subscribe((data: MaTienda[]) => {
      var tienda = data[0];

      const obj = {
        'idempresa': tienda.idempresa,
        'xname': tienda.xname,
        'nstore': tienda.nstore,
        'xtelf': tienda.xtelf,
        'xaddress': tienda.xaddress,
      };

      const sessionJson = JSON.stringify(obj);
      sessionStorage.setItem('MaTienda', sessionJson);
    })
    
  }

}
