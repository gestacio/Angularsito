import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SeUsuario } from 'src/app/interfaces/seusuario';
import { SeUsuarioService } from 'src/app/services/seusuario.service';
import { catchError } from 'rxjs/operators'
import { MaEmpresaService } from 'src/app/services/maempresa.service';
import { MaEmpresa } from 'src/app/interfaces/maempresa';

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
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,) {
    this.form = this.fb.group({
      xusuario: ['', Validators.required],
      xclave: ['', Validators.required],
    })
  }

  postLoginSeusuario() {
    const seusuario: SeUsuario = {
      xusuario: this.form.value.xusuario,
      xclave: this.form.value.xclave,
    }

    // this._seusuarioService.postLoginSeUsuario(seusuario).subscribe((data: SeUsuario) => {
    //   // console.log(data);
    //   this.resSeUsuario = data;

    //   // console.log(this.resSeUsuario);
    //   if (this.resSeUsuario) {
    //     this.router.navigate(['/products'])
    //   }
    // })

    this._seusuarioService.postLoginSeUsuario(seusuario)
      .pipe(catchError(err => {
        this.toastr.info(`Usuario ${seusuario.xusuario} no encontrado o contraseña inválida`, "Error")
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
      this._maempresaService.getMaEmpresa().subscribe((data: MaEmpresa) => {
        
        const obj = {
          'xrif': data.xrif,
          'xshortname': data.xshortname,
          'xlongname': data.xlongname,
          'xaddress': data.xaddress,
        };

        const jsonMaEmpresa = JSON.stringify(obj)
        sessionStorage.setItem('MaEmpresa', jsonMaEmpresa);
      })
    }

}
