import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registroForm!: FormGroup;
  userdata: any; 
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
  constructor(private formBuilder: FormBuilder,public authS:AuthService,private router:Router) {

  }
  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
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
    /*
      this.authS.$ready?.subscribe((data)=>{
      if(data){
        this.router.navigate(['/inicio']);
      }
    })
   */
    this.registroForm.valueChanges.subscribe(data =>this.onValueChanged(data));
    this.onValueChanged();
   
  }
  onSubmit() {
    this.userdata = this.saveUserdata();
    this.userdata=this.authS.registroUsuario(this.userdata);
    this.router.navigate(['/inicio'])
  }
  /*
  login(){
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
  */

 
  onValueChanged(data?: any) {
    if (!this.registroForm) { return; }
    const form = this.registroForm;
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
  
  saveUserdata() {
    const saveUserdata = {
    email: this.registroForm.get('email')?.value,
    password: this.registroForm.get('password')?.value,
    };
    return saveUserdata;
    }
  
}