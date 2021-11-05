import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User | null = null;
  public ready:boolean = false;
  public $ready:Observable<boolean>|null=null;
  firebase: any;

  constructor(
    private authf: AngularFireAuth  //inyectamos el servicio de auth de Firebase
  ) {
    this.checkSSO();
   }

  public googleLogin(): Promise<firebase.default.auth.UserCredential> {
    return this.authf.signInWithPopup(new GoogleAuthProvider())
  }

  public emailLogin(userdata:{email:string,password:string}): Promise<firebase.default.auth.UserCredential> {
    return this.authf.signInWithEmailAndPassword(userdata.email,userdata.password);
  }
  public setUser(u: firebase.default.auth.UserCredential | any| null): void {
    if (u && u.user) {
      this.user = {
        displayName: u.user?.displayName,
        email: u.user?.email,
        photoURL: u.user?.photoURL,
        uid: u.user?.uid
      };
    } else {
      this.user = null;
    }
  }

  public get isLogged(): boolean {
    return this.user ? true : false;
  }
  public checkSSO(): void {
    this.$ready=new Observable((observer)=>{
      try {
        //devuelve el user si estás autenticado
        //null en caso contrario
        this.authf.authState.subscribe((data) => {
          this.ready=true;
          if(data!=null){
            this.setUser({user:data});
            observer.next(true);
          }else{
            this.setUser(null);
            observer.next(false);
          }
          observer.complete();
        })
      } catch (err) {
        console.log(err);
        this.setUser(null);
        this.ready=true;
        observer.next(false);
        observer.complete();
      }
    })
  }

  public logout():Promise<void>{
    return new Promise(async (resolve,reject)=>{
      if(this.isLogged){
        try{
          await this.authf.signOut();
          this.setUser(null);
          resolve();
        }catch(err){
          reject(err);
        }
      }
    })
  }

  public registroUsuario(userdata: {email:any; password:any;}): Promise<firebase.default.auth.UserCredential>{
    return this.authf.createUserWithEmailAndPassword(userdata.email, userdata.password);
  }

}
