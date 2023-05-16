import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeUsuario } from 'src/app/interfaces/seusuario';
import { SeUsuarioService } from 'src/app/services/seusuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  isLogin: boolean = true;
  resSeUsuario = {};

  constructor(private _seusuarioService: SeUsuarioService, private fb: FormBuilder, private router: Router) {
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

    try {
      this._seusuarioService.postLoginSeUsuario(seusuario).subscribe((data: SeUsuario) => {
        this.resSeUsuario = data;
        
        // console.log(this.resSeUsuario);
        if (this.resSeUsuario) {
            this.router.navigate(['/products'] )
        }
      })   
    } catch (error) {
      console.log(error);
    }

  }
}
