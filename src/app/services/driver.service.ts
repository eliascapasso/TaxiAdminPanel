import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Driver } from '../domain/driver.model';
import { User } from '../domain/user.model';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class DriverService {
    drivers: Observable<Driver[]>;
    driverDoc: AngularFirestoreDocument<Driver>;
    driversCollection: AngularFirestoreCollection<Driver>;

    constructor(public db: AngularFirestore, private userService: UserService) {
        this.driversCollection = this.db.collection('Drivers');

        this.drivers = this.driversCollection.snapshotChanges().pipe(
            map((actions) => {
                return actions.map((a) => {
                    const data = a.payload.doc.data() as Driver;
                    data.id = a.payload.doc.id;
                    return data;
                });
            })
        );
    }

    getDrivers() {
        return this.drivers;
    }

    async addDriver(driver: Driver, user: User) {
        driver.geoPosition = null;
        try {
            let userId = await this.userService.addUser(user);
            driver.userId = userId;
            if (driver.userId != undefined) {
                this.driversCollection.add(driver);

                location.reload();
            }
        } catch (error) {
            throw error;
        }
    }

    async editDriver(driver: Driver, user: User) {
        driver.geoPosition = null;
        try {
            if (user.id != undefined) {
                await this.userService.editUser(user);
                driver.userId = user.id;
            }

            if (driver.id != undefined) {
                this.driverDoc = await this.db.doc(`Drivers/${driver.id}`);
                this.driverDoc.update(driver);
            }
        } catch (error) {
            throw error;
        }
    }

    deleteDriver(userId: string) {
        try {
            this.userService.getUser(userId).subscribe((user) => {
                user.id = userId;
                user.enabled = false;
                this.userService.editUser(user);
            });
        } catch (error) {
            throw error;
        }
    }
}
