import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Passenger } from '../../../app/domain/passenger.model';
import { PassengerService } from '../../services/passenger.service';

@Component({
    selector: 'app-passengers',
    templateUrl: './passengers.component.html',
    styleUrls: ['./passengers.component.scss'],
    animations: [routerTransition()]
})
export class PassengersComponent implements OnInit {
    buttonNameAdd = '+ Add passenger';
    buttonNameEdit = 'Edit';
    public passengers = {} as Passenger[];
    public originalPassengers = {} as Passenger[];
    search: string = '';

    constructor(private passengerService: PassengerService) {}

    ngOnInit() {
        this.getpassengers();
    }

    getpassengers() {
        this.passengerService.getPassengers().subscribe((passengers) => {
            console.log(passengers);
            this.passengers = passengers;
            this.originalPassengers = passengers;
        });
    }

    deletepassenger(event, passenger: Passenger) {
        console.info(event);
        console.info(passenger);
        if (confirm('Are you sure to delete ' + passenger.firstname + '?')) {
            this.passengerService.deletePassenger(passenger);
        }
    }

    changeFilterHandler() {
        this.passengers = this.originalPassengers.filter((passenger) => {
            if (this.search != '') {
                if (passenger.firstname && passenger.firstname.toLowerCase().includes(this.search.toLowerCase())) {
                    return true;
                } else if (passenger.lastname && passenger.lastname.toLowerCase().includes(this.search.toLowerCase())) {
                    return true;
                } else if (passenger.email && passenger.email.toString().includes(this.search.toLowerCase())) {
                    return true;
                } else if (passenger.address && passenger.address.toString().includes(this.search.toLowerCase())) {
                    return true;
                } else if (passenger.phoneNumber && passenger.phoneNumber.toLowerCase().includes(this.search.toLowerCase())) {
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        });
    }
}
