import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { AddpresComponent } from './presupuestos/addpres/addpres.component';
import { EditpresComponent } from './presupuestos/editpres/editpres.component';
import { AddproveeComponent } from './proveedores/addprovee/addprovee.component';
import { ProveedoresComponent } from './proveedores/proveedores/proveedores.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [{path:'', redirectTo:'/login',pathMatch:'full'},
{path:'login', component:LoginComponent},
{path:'header', component:HeaderComponent},
{path:'inicio', component:InicioComponent},
{path:'addpres', component:AddpresComponent},
{path:'addprovee', component:AddproveeComponent},
{path:'proveedores', component:ProveedoresComponent},
{path:'editpres/:key', component:EditpresComponent},
{path:'register', component:RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
