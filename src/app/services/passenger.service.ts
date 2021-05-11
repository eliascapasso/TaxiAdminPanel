import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Passenger } from '../domain/passenger.model';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  passengers: Observable<Passenger[]>;
  passengerDoc: AngularFirestoreDocument<Passenger>;
  passengersCollection: AngularFirestoreCollection<Passenger>;

  constructor(public db: AngularFirestore) {
      this.passengersCollection = this.db.collection('Passengers');
      this.passengers = this.passengersCollection.snapshotChanges().pipe(map((actions) => {
          return actions.map(a =>{
              const data = a.payload.doc.data() as Passenger;
              data.id = a.payload.doc.id;
              return data;
          })
      }));
  }

  getPassengers() {
      return this.passengers;
  }

  addPassenger(passenger: Passenger){
      this.passengersCollection.add(passenger);
  }

  editPassenger(passenger: Passenger) {
      this.passengerDoc = this.db.doc(`Passengers/${passenger.id}`);
      this.passengerDoc.update(passenger);
  }

  deletePassenger(passenger: Passenger) {
      this.passengerDoc = this.db.doc(`Passengers/${passenger.id}`);
      this.passengerDoc.delete();
  }
}
