import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../domain/user.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    users: Observable<User[]>;
    userDoc: AngularFirestoreDocument<User>;
    usersCollection: AngularFirestoreCollection<User>;

    constructor(public db: AngularFirestore, public authService: AuthService) {
        this.usersCollection = this.db.collection('Users');
        
        this.users = this.usersCollection.snapshotChanges().pipe(
            map((actions) => {
                return actions.map((a) => {
                    const data = a.payload.doc.data() as User;
                    data.id = a.payload.doc.id;
                    return data;
                });
            })
        );
    }

    getUsers() {
        return this.users;
    }

    getUser(id: string): Observable<User>{
      return this.db.doc(`Users/${id}`).valueChanges();
    }

    async addUser(user: User) {
        try {
            let reg = await this.authService.onRegistrer(user);
            if(reg){
              let u = await this.usersCollection.add(user);

              return u.id;
            }
            else{
              throw "Registrer error";
            }
        } catch (error) {
            throw error;
        }
    }

    editUser(user: User) {
        try {
            this.userDoc = this.db.doc(`Users/${user.id}`);
            this.userDoc.update(user);
        } catch (error) {
            throw error;
        }
    }

    // deleteUser(userId: string) {
    //     this.userDoc = this.db.doc(`Users/${userId}`);
    //     this.userDoc.delete();
    // }
}
