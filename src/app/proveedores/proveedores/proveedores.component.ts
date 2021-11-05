import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})

export class ProveedoresComponent implements OnInit {
  proveedores:any;
  mensaje:string="";
  constructor(private proveedoresService:ProveedoresService,private db:AngularFireDatabase) { }
 
  ngOnInit(): void {
    this.mensaje=this.proveedoresService.getProveedores();
    this.proveedores=this.proveedoresService.getProveedores();
  }

  getProveedor():void{
    let c={
      nombre:"Carlos",
      telefono:600564565,
      ciudad:"Córdoba",
      hobbies:[
        "correr","saltar"
      ]
    }

    this.db.database.ref().child("proveedores").get().then((data)=>{

      const jugadores=data.val();
      for(let proveedor in this.proveedores){
        console.log(jugadores[proveedor])
      }
  })
  }

}
