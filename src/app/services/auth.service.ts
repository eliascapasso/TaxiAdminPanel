import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../domain/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public isLogged: any = false;

    constructor(public afAuth: AngularFireAuth) {
        afAuth.authState.subscribe((user) => (this.isLogged = user));
    }

    async onLogin(user: User) {
        return await this.afAuth.signInWithEmailAndPassword(user.email, user.password);
    }

    async onRegistrer(user: User) {
        return await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
    }
}
