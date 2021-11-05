import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Presupuesto } from 'src/app/model/Presupuesto';
import { AuthService } from 'src/app/servicios/auth.service';
import { PresupuestosService } from 'src/app/servicios/presupuestos.service';

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.css']
})
export class PresupuestosComponent implements OnInit {

  presupuestos: Presupuesto[]|any;
  presupuesto: any;
  key!: string;
  pre: Presupuesto

  constructor(private presupuestosService: PresupuestosService, private router: Router,
    private activatedrouter: ActivatedRoute,public authS:AuthService) { }

  ngOnInit() {
    this.presupuestos = this.presupuestosService.getpresupuestos();
    this.authS.isLogged==true;
  }
  deletePresupuesto(key: string) {
    this.presupuestosService.deletPresus(key);
    this.presupuestos = this.presupuestosService.getpresupuestos();
  }
}
