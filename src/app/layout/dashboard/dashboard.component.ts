import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CarService } from '../../services/car.service';
import { DriverService } from '../../services/driver.service';
import { PassengerService } from '../../services/passenger.service';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    showMenu: string;
    passengersCount: number = 0;
    driversCount: number = 0;
    carsCount: number = 0;
    
    constructor(private translate: TranslateService, 
                private passengerservice: PassengerService, 
                private driverService: DriverService, 
                private carService: CarService) {
    }

    ngOnInit() {
        this.showMenu = '';
        this.passengerservice.getPassengers().subscribe(passengers =>{
            this.passengersCount = passengers.length;
        });

        this.driverService.getDrivers().subscribe(drivers =>{
            this.driversCount = drivers.length;
        });

        this.carService.getCars().subscribe(cars =>{
            this.carsCount = cars.length;
        });
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}
