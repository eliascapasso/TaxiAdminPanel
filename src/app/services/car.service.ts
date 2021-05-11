import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Car } from '../domain/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  cars: Observable<Car[]>;
  carDoc: AngularFirestoreDocument<Car>;
  carsCollection: AngularFirestoreCollection<Car>;

  constructor(public db: AngularFirestore) {
      this.carsCollection = this.db.collection('Cars');
      this.cars = this.carsCollection.snapshotChanges().pipe(map((actions) => {
          return actions.map(a =>{
              const data = a.payload.doc.data() as Car;
              data.id = a.payload.doc.id;
              return data;
          })
      }));
  }

  getCars() {
      return this.cars;
  }

  addCar(car: Car){
      this.carsCollection.add(car);
  }

  editCar(car: Car) {
      this.carDoc = this.db.doc(`Cars/${car.id}`);
      this.carDoc.update(car);
  }

  deleteCar(car: Car) {
      this.carDoc = this.db.doc(`Cars/${car.id}`);
      this.carDoc.delete();
  }
}
