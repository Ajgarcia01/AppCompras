import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public imagen;
  public loggingout:boolean=false;
  constructor(public authS:AuthService, private router:Router) { this.imagen = this.authS.user?.photoURL; }

  ngOnInit(): void {
    this.authS.$ready?.subscribe((data) => {
    })
  }
  public async logout() {
    //deshablito el boton de llogout // muestro un espere...
    this.loggingout=true;
    try {
      await this.authS.logout();
      this.router.navigate(['/login']);
      this.loggingout=false;
    } catch (err) {
      //toast no he podido cerrar sesión
      this.loggingout=false;
      alert(err);
    }
  }
}
