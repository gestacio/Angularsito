import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { SellProductComponent } from './components/sell-product/sell-product.component';
import { CajaComponent } from './components/caja/caja.component';
import { UsuariosComponent } from './components/seguridad/usuarios/usuarios.component';
import { RolesComponent } from './components/seguridad/roles/roles.component';
import { FacturasComponent } from './components/factura/facturas/facturas.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'products', component: ListProductsComponent },
  { path: 'add', component: AddEditProductComponent },
  { path: 'edit/:id', component: AddEditProductComponent },
  { path: 'sell', component: SellProductComponent },
  { path: 'caja', component: CajaComponent },
  { path: 'facturas', component: FacturasComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
