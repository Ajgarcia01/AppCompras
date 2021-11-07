import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { throwError } from 'rxjs';
import { Presupuesto } from 'src/app/model/Presupuesto';

@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {
  presupuesto: any;
  constructor(private db: AngularFireDatabase) { }

  presupuestos: any[] = [];

  postPresupuesto(presupuesto: any) {
    this.db.database.ref().child("presupuestos").get().then((data) => {
      console.log(data.key);
      console.log(data.val())
      const presupuestos = data.val();
      for (let presupuesto in presupuestos) {
        console.log(presupuestos[presupuesto])
      }
    })
  }
  addpress(presupuesto: any) {
    this.db.database.ref().child("presupuestos").push(presupuesto)
  }
  putPresupuesto(presupuesto: any, key: string) {
    this.db.database.ref().child("presupuestos").child(key).update(presupuesto);
  }
  getpresupuestos(): any [] {

    let result:any[]=[];
    this.db.database.ref().child("presupuestos").get().then((data)=> {
      let presupuestos=data.val();
      for(let presupuesto in presupuestos){
        result.push({key:presupuesto, ...presupuestos[presupuesto]})
      }
    })
      return result;
  }

  async getPresupuesto(key: string) {
    try {
     
      let tmp = await this.db.database.ref().child("presupuestos").child(key).get();
      let result: Presupuesto = {$key:key, ...tmp.val()};
      result.key=key;
      console.log(result)
      return result;
      
    } catch (err) {
      throwError(err);
      return null;
    }
  }

  deletPresus(key: string) {
    this.db.object('presupuestos/' + key).remove();
  }

}

