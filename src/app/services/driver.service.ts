import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Driver } from '../domain/driver.model';
import { DriverView } from '../domain/driverView.model';
import { Role } from '../domain/role';
import { User } from '../domain/user.model';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class DriverService {
    drivers: Driver[];
    driverDoc: AngularFirestoreDocument<Driver>;
    driversCollection: AngularFirestoreCollection<Driver>;

    constructor(public db: AngularFirestore, private userService: UserService) {
        this.driversCollection = this.db.collection('Drivers');

        this.driversCollection
            .snapshotChanges()
            .pipe(
                map((actions) => {
                    return actions.map((a) => {
                        const data = a.payload.doc.data() as Driver;
                        data.id = a.payload.doc.id;
                        return data;
                    });
                })
            )
            .subscribe((drivers) => {
                this.drivers = drivers;
            });
    }

    getDrivers() {
        return this.drivers;
    }

    getCount() {
        return this.drivers.length;
    }

    async addDriver(driverView: DriverView, user: User) {
        user.role = [];
        user.role.push(Role.DRIVER);
        user.enabled = true;

        let driver: Driver = {
            socialId: driverView.socialId,
            geoPosition: null,
            name: user.lastname + " " + user.firstname,
            userId: driverView.userId
        }

        try {
            let userId = await this.userService.addUser(user);
            driver.userId = userId;
            if (driver.userId != undefined) {
                driver = await this.driversCollection.add(driver);

                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
        } catch (error) {
            throw error;
        }
    }

    async editDriver(driverView:DriverView, user: User) {
        
        let driver: Driver = {
            id: driverView.driverId,
            socialId: driverView.socialId,
            geoPosition: driverView.geoPosition,
            name: user.lastname + " " + user.firstname,
            userId: driverView.userId
        }

        try {
            if (user.id != undefined) {
                await this.userService.editUser(user);
                driver.userId = user.id;
            }
            
            if (driver.id != undefined) {
                this.driverDoc = await this.db.doc(`Drivers/${driver.id}`);
                this.driverDoc.update(driver);
            }

            setTimeout(() => {
                location.reload();
            }, 2000);
        } catch (error) {
            throw error;
        }
    }

    deleteDriver(userId: string) {
        try {
            let user = this.userService.getUser(userId);
            user.enabled = false;
            this.userService.editUser(user);
        } catch (error) {
            throw error;
        }
    }
}
