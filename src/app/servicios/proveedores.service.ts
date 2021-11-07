import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { throwError } from 'rxjs';
import { Proveedor } from '../model/Proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private db:AngularFireDatabase) { }

  proveedores: any[] = [];
  proveedor:any;
   
postProveedor(proveedor: any) {
  this.db.database.ref().child("proveedores").get().then((data) => {
    console.log(data.key);
    console.log(data.val())
    const proveedores = data.val();
    for (let proveedor in proveedores) {
      console.log(proveedor[proveedores])
    }
  })
}
addprove(proveedor: any) {
  this.db.database.ref().child("proveedores").push(proveedor)
}

deleteprove(key: string) {
  this.db.object('proveedores/' + key).remove();
  console.log(key)
}
getProveedores(): any [] {

  let result:any[]=[];
  this.db.database.ref().child("proveedores").get().then((data)=> {
    let proveedores=data.val();
    for(let proveedor in proveedores){
      result.push({key:proveedor, ...proveedores[proveedor]})
    }
  })
    return result;
}
async getProveedor(key: string) {
  try {
   
    let tmp = await this.db.database.ref().child("proveedores").child(key).get();
    let result: Proveedor = {$key:key, ...tmp.val()};
    result.key=key;
    console.log(result)
    return result;
    
  } catch (err) {
    throwError(err);
    return null;
  }
}


putProveedor(proveedor:any,key:string){
  this.db.database.ref().child("proveedores").child(key).update(proveedor);
}


}
