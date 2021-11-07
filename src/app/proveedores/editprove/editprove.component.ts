import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from 'src/app/model/Proveedor';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';

@Component({
  selector: 'app-editprove',
  templateUrl: './editprove.component.html',
  styleUrls: ['./editprove.component.css']
})
export class EditproveComponent implements OnInit {
  proveFrom:FormGroup
  proveedor: Proveedor | any;
  nombre:any;
  cif:any;
  direccion:any;
  cp:any;
  localidad:any;
  provincia:any;
  telefono:any;
  email:any;
  contacto:any;
  key:string;
  provincias: string[] = [ 
    'Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona',
    'Burgos', 'Cáceres', 'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba',
    'La Coruña','Cuenca','Gerona','Granada','Guadalajara',
    'Guipúzcoa','Huelva','Huesca','IslasBaleares','Jaén','León','Lérida','Lugo',
    'Madrid', 'Málaga','Murcia','Navarra','Orense','Palencia','Las Palmas',
    'Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
    'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 
    'Zamora','Zaragoza' ]
  constructor(private pf:FormBuilder,private proveedoresService:ProveedoresService,private router:Router,
    private activatedrouter:ActivatedRoute) { 
    this.activatedrouter.params.subscribe(parametros =>{
      this.key=parametros['key'];
    (async ()=>{
      this.proveedor=await this.proveedoresService.getProveedor(this.key);
      this.setProveedor();
      
    })();
    });
  }

  ngOnInit(): void {
    this.setProveedor();
    console.log("hola")
    console.log(this.proveedoresService.getProveedor(this.key))
  }

  setProveedor():void{
    this.proveFrom=this.pf.group({
      nombre:[this.proveedor?.nombre,Validators.required],
      cif:[this.proveedor?.cif,Validators.required],
      direccion:[this.proveedor?.direccion,Validators.required],
      cp:[this.proveedor?.cp,Validators.required],
      localidad:[this.proveedor?.localidad,Validators.required],
      provincia:[this.proveedor?.provincia,Validators.required],
      telefono:[this.proveedor?.telefono,Validators.required],
      email:[this.proveedor?.email,Validators.required],
      contacto:[this.proveedor?.contacto,Validators.required],

    });
  }


  UpdateProveedor(){
    this.proveedor=this.saveProveedor();
    this.proveedoresService.putProveedor(this.proveedor,this.key);
    this.router.navigate(['/proveedores']);
  }

  saveProveedor(){
    const saveproveedores={
      nombre: this.proveFrom.get('nombre')?.value,
      cif: this.proveFrom.get('cif')?.value,
      direccion: this.proveFrom.get('direccion')?.value,
      cp: this.proveFrom.get('cp')?.value,
      localidad: this.proveFrom.get('localidad')?.value,
      provincia: this.proveFrom.get('provincia')?.value,
      telefono: this.proveFrom.get('telefono')?.value,
      email: this.proveFrom.get('email')?.value,
      contacto: this.proveFrom.get('contacto')?.value,
    }
    return saveproveedores;
  }

}
