import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Proveedor } from 'src/app/model/Proveedor';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})

export class ProveedoresComponent implements OnInit {
  proveedores:Proveedor[]|any;
  proveedor:any;
  constructor(private proveedoresService:ProveedoresService) { }
 
  ngOnInit() {
  this.proveedores=this.proveedoresService.getProveedores();
  console.log(this.proveedores=this.proveedoresService.getProveedores())
  }

  deleteProveedor(key: string) {
    this.proveedoresService.deleteprove(key);
    console.log(key)
    this.proveedores = this.proveedoresService.getProveedores();
  }
}
