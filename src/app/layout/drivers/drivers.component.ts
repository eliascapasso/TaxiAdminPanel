import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../../app/services/driver.service';
import { Driver } from '../../../app/domain/driver.model';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-drivers',
    templateUrl: './drivers.component.html',
    styleUrls: ['./drivers.component.scss'],
    animations: [routerTransition()]
})
export class DriversComponent implements OnInit {
    buttonNameAdd = '+ Add driver';
    buttonNameEdit = 'Edit';
    public drivers = {} as Driver[];
    public originalDrivers = {} as Driver[];
    search: string = '';

    constructor(private driverService: DriverService) {}

    ngOnInit() {
        this.getDrivers();
    }

    getDrivers() {
        this.driverService.getDrivers().subscribe((drivers) => {
            console.log(drivers);
            this.drivers = drivers;
            this.originalDrivers = drivers;
        });
    }

    deleteDriver(event, driver: Driver) {
        console.info(event);
        console.info(driver);
        if (confirm('Are you sure to delete ' + driver.email + '?')) {
            this.driverService.deleteDriver(driver);
        }
    }

    changeFilterHandler() {
        this.drivers = this.originalDrivers.filter((driver) => {
            if (this.search != '') {
                if (driver.email && driver.email.toLowerCase().includes(this.search.toLowerCase())) {
                    return true;
                } else if (driver.firstname && driver.firstname.toLowerCase().includes(this.search.toLowerCase())) {
                    return true;
                } else if (driver.lastname && driver.lastname.toLowerCase().includes(this.search.toLowerCase())) {
                    return true;
                } else if (driver.email && driver.email.toLowerCase().includes(this.search.toLowerCase())) {
                    return true;
                } else if (driver.phoneNumber && driver.phoneNumber.toLowerCase().includes(this.search.toLowerCase())) {
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        });
    }
}
