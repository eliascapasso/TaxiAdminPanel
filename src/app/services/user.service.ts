import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from '../domain/user.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    users: User[];
    userDoc: AngularFirestoreDocument<User>;
    usersCollection: AngularFirestoreCollection<User>;

    constructor(public db: AngularFirestore, public authService: AuthService) {
        this.usersCollection = this.db.collection('Users');

        this.usersCollection
            .snapshotChanges()
            .pipe(
                map((actions) => {
                    return actions.map((a) => {
                        const data = a.payload.doc.data() as User;
                        data.id = a.payload.doc.id;
                        return data;
                    });
                })
            )
            .subscribe((users) => {
                this.users = users;
            });
    }

    getUsers() {
        return this.users;
    }

    getUser(id: string): User {
        for (let user of this.users) {
            if (id == user.id) {
                return user;
            }
        }

        return null;
    }

    async addUser(user: User) {
        try {
            let reg = await this.authService.onRegistrer(user);
            if (reg) {
                let u = await this.usersCollection.add(user);

                return u.id;
            } else {
                throw 'Registrer error';
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
}
