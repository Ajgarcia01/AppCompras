import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { PresupuestosService } from 'src/app/servicios/presupuestos.service';

@Component({
  selector: 'app-addpres',
  templateUrl: './addpres.component.html',
  styleUrls: ['./addpres.component.css']
})
export class AddpresComponent implements OnInit {
  presupuestoForm:FormGroup;
  proveedor:any;
  presupuesto:any;
  base: any;
  tipo: any;
  iva: any = 0;
  total: any = 0;
  constructor(public authS:AuthService,private pf:FormBuilder,private presupuestoService: PresupuestosService,private router:Router) { }

  ngOnInit(): void {
    //this.authS.isLogged==true;
    this.presupuestoForm=this.pf.group({
      proveedor:['',Validators.required],
      fecha:['',Validators.required],
      concepto:['',Validators.required],
      base:['',Validators.required],
      tipo:['',Validators.required],
      iva:this.iva,
      total:this.total
    });
    this.onChanges();
  }

  onSubmit(){
    this.presupuesto=this.savePresupuesto();
    this.presupuestoService.postPresupuesto(this.presupuesto);
    this.router.navigate(['/presupuestos']);
  }
  savePresupuesto() {
    const savePresupuesto = {
    proveedor: this.presupuestoForm.get('proveedor')?.value,
    fecha: this.presupuestoForm.get('fecha')?.value,
    concepto:  this.presupuestoForm.get('concepto')?.value,
    base:  this.presupuestoForm.get('base')?.value,
    tipo:  this.presupuestoForm.get('tipo')?.value,
    iva:  this.presupuestoForm.get('iva')?.value, 
    total:  this.presupuestoForm.get('total')?.value 
    };
    this.presupuestoService.addpress(savePresupuesto);
    return savePresupuesto;
    }

    onChanges():void{
      this.presupuestoForm.valueChanges.subscribe(valor => { 
        this.base = valor.base; 
        this.tipo = valor.tipo;
        this.presupuestoForm.value.iva = this.base * this.tipo; 
        this.presupuestoForm.value.total = this.base + (this.base * this.tipo);
        });
        }
    

}
