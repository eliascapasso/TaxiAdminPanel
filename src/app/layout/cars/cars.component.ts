import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car } from '../../../app/domain/car.model';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-cars',
    templateUrl: './cars.component.html',
    styleUrls: ['./cars.component.scss'],
    animations: [routerTransition()]
})
export class CarsComponent implements OnInit {
    buttonNameAdd = '+ Add car';
    buttonNameEdit = 'Edit';
    public cars = {} as Car[];
    public originalCars = {} as Car[];
    search: string = '';

    constructor(private carService: CarService) {}

    ngOnInit() {
        this.getCars();
    }

    getCars() {
        this.carService.getCars().subscribe((cars) => {
            console.log(cars);
            this.cars = cars;
            this.originalCars = cars;
        });
    }

    deleteCar(event, car: Car) {
        console.info(event);
        console.info(car);
        if (confirm('Are you sure to delete ' + car.brand + '?')) {
            this.carService.deleteCar(car);
        }
    }

    changeFilterHandler() {
        this.cars = this.originalCars.filter((car) => {
            if (this.search != '') {
                if (car.brand && car.brand.toLowerCase().includes(this.search.toLowerCase())) {
                    return true;
                } else if (car.model && car.model.toLowerCase().includes(this.search.toLowerCase())) {
                    return true;
                } else if (car.modelYear && car.modelYear.toString().includes(this.search.toLowerCase())) {
                    return true;
                } else if (car.seats && car.seats.toString().includes(this.search.toLowerCase())) {
                    return true;
                } else if (car.trunkCapacity && car.trunkCapacity.toLowerCase().includes(this.search.toLowerCase())) {
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        });
    }
}
