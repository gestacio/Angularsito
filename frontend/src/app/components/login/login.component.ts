import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeUsuario } from 'src/app/interfaces/seusuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,) {
    this.form = this.fb.group({
      xusuario: ['', Validators.required],
      xclave: ['', Validators.required],
    })
  }

  entrar() {
    const seusuario: SeUsuario = {
      xusuario: this.form.value.xusuario,
      xclave: this.form.value.xclave,
      // price: this.form.value.price,
      // stock: this.form.value.stock,
    }
    console.log(seusuario.xusuario);
    console.log(seusuario.xclave);
    this.router.navigate(['/'])
  
  }

}
