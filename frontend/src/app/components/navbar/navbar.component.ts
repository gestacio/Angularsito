import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  router = Router;

  getUrl() {
    console.log(this.router.name);
    // return this.router.name;
  }

  maempresa = JSON.parse(sessionStorage.getItem('MaEmpresa')!);
  matienda = JSON.parse(sessionStorage.getItem('MaTienda')!);

  empresa = this.maempresa.xshortname;
  tienda = this.matienda.xname;
  

}
