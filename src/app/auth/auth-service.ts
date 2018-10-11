import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class AuthService{
    token:string;
    constructor(private router:Router){

    }
    signupUsers(email:string, password:string){
        firebase.auth().createUserWithEmailAndPassword(email, password).then(res=>console.log(res))
        .catch(
            err=>console.log(err)
        )
    }
    logout(){
        firebase.auth().signOut();
        this.token=null;
    }

    signinUsers(email:string, password:string){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            (res)=>{
                this.router.navigate(['/'])
                firebase.auth().currentUser.getIdToken()

            .then(
                (token:string)=>{this.token=token
                console.log(this.token)}
                )
            }
        )
            
        .catch(
            err=>console.log(err)
        )
    }

    getToken(){
         firebase.auth().currentUser.getIdToken()
        .then(
            (token:string)=>this.token=token
)
.catch(
    err=>console.log(err)
);
        
    return this.token;
    }
    isAuthenticated(){
        return this.token!=null;
    }
}