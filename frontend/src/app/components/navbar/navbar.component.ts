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

  data = JSON.parse(sessionStorage.getItem('MaEmpresa')!);
  empresa = this.data.xshortname;
  

}
