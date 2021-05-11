import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Driver } from '../domain/driver.model';

@Injectable({
    providedIn: 'root'
})
export class DriverService {
    drivers: Observable<Driver[]>;
    driverDoc: AngularFirestoreDocument<Driver>;
    driversCollection: AngularFirestoreCollection<Driver>;

    constructor(public db: AngularFirestore) {
        this.driversCollection = this.db.collection('Drivers');
        this.drivers = this.driversCollection.snapshotChanges().pipe(map((actions) => {
            return actions.map(a =>{
                const data = a.payload.doc.data() as Driver;
                data.id = a.payload.doc.id;
                return data;
            })
        }));
    }

    getDrivers() {
        return this.drivers;
    }

    addDriver(driver: Driver){
        this.driversCollection.add(driver);
    }

    editDriver(driver: Driver) {
        this.driverDoc = this.db.doc(`Drivers/${driver.id}`);
        this.driverDoc.update(driver);
    }

    deleteDriver(driver: Driver) {
        this.driverDoc = this.db.doc(`Drivers/${driver.id}`);
        this.driverDoc.delete();
    }
}
