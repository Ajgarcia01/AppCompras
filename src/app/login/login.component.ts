import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  public islogged:boolean=false
  userdata!:any;
  erroresForm :any= {
    'email': '',
    'password': ''
    }
  mensajesValidacion: any = {
    'email': {
    'required': 'Email obligatorio',
    'email': 'Introduzca una dirección email correcta'
      },
    'password': {
    'required': 'Contraseña obligatoria',
    'pattern': 'La contraseña debe tener al menos una letra un número ',
    'minlength': 'y más de 6 caracteres'
      }
    }
  
  constructor(private formBuilder: FormBuilder,public authS:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authS.$ready?.subscribe((data)=>{
      if(data){
        this.router.navigate(['/inicio']);
      }
    })
    this.loginForm = this.formBuilder.group({
      'email': ['', [
      Validators.required,
      Validators.email
      ]
      ],
      'password': ['', [
      Validators.required,
      Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), 
      Validators.minLength(6)
      ]
      ]
      });
      this.loginForm.valueChanges.subscribe(data =>this.onValueChanged(data));
      this.onValueChanged();
  }
  onSubmit() {
    
  }
  loginGoogle(){
    this.authS.googleLogin()
    .then((data)=>{
      this.authS.setUser(data);
      if(this.authS.isLogged){
        this.router.navigate(['/inicio']);
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }
 async login(){
    try{
    this.userdata = this.saveUserdata();
   let user= await this.authS.emailLogin(this.userdata); //te logueas , pero el resultado no es inmediato
   this.authS.setUser(user);
    console.log(this.authS.user) 
    if(this.authS.isLogged==true){  //se ejecuta ms después de la línea anterior -> entonces te da aún false
        this.router.navigate(['/inicio']);
      }
    }catch(err){
      console.log(err);
    }
  }

  saveUserdata() {
    const saveUserdata = {
    email: this.loginForm.get('email')?.value,
    password: this.loginForm.get('password')?.value,
    };
    return saveUserdata;
    }
    onValueChanged(data?: any) {
      if (!this.loginForm) { return; }
      const form = this.loginForm;
      for (const field in this.erroresForm) {
     
      this.erroresForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
      const messages = this.mensajesValidacion[field];
      for (const key in control.errors) {
      this.erroresForm[field] += messages[key] + ' ';
     }
    }
   }
  }
}
