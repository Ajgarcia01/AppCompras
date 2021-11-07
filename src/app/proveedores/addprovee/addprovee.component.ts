import { ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PresupuestosService } from 'src/app/servicios/presupuestos.service';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';

@Component({
  selector: 'app-addprovee',
  templateUrl: './addprovee.component.html',
  styleUrls: ['./addprovee.component.css']
})

export class AddproveeComponent implements OnInit {
  //@ViewChild('formpro') formpro: NgForm;
  proveFrom:FormGroup
  proveedor:any;
  proveedores:any;
  nombre:'';
  cif:'';
  direccion:'';
  cp:'';
  localidad:'';
  provincia:'';
  telefono:'';
  email:'';
  contacto:'';

  provincias: string[] = [ 
    'Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona',
    'Burgos', 'Cáceres', 'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba',
    'La Coruña','Cuenca','Gerona','Granada','Guadalajara',
    'Guipúzcoa','Huelva','Huesca','IslasBaleares','Jaén','León','Lérida','Lugo',
    'Madrid', 'Málaga','Murcia','Navarra','Orense','Palencia','Las Palmas',
    'Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
    'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 
    'Zamora','Zaragoza' ]
  
  constructor(private pf:FormBuilder,private proveedoresService:ProveedoresService,private router:Router) { 
  
  }

  ngOnInit(): void {
    this.proveFrom=this.pf.group({
      nombre:['',Validators.required],
      cif:['',Validators.required],
      direccion:['',Validators.required],
      cp:['',Validators.required],
      localidad:['',Validators.required],
      provincia:['',Validators.required],
      telefono:['',Validators.required],
      email:['',Validators.required],
      contacto:['',Validators.required],

    });
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
    this.proveedoresService.addprove(saveproveedores);
    return saveproveedores;
  }
  
    onSubmit(){
      this.proveedor=this.saveProveedor();
      this.proveedoresService.postProveedor(this.proveedor);
      this.onChanges();
      this.router.navigate(['/proveedores']);
   
    }

    
    onChanges():void{
      
        this.nombre = "",
        this.cif =  "",
        this.direccion =  "",
        this.cp =  "",
        this.localidad =  "",
        this.provincia = "",
        this.telefono =  '',
        this.email =  "",
        this.contacto = "";
      
        }
        

}
