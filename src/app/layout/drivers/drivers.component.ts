import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../../app/services/driver.service';
import { routerTransition } from '../../router.animations';
import { DriverView } from '../../../app/domain/driverView.model';
import { Mapper } from '../../../app/shared/util/mapper';

@Component({
    selector: 'app-drivers',
    templateUrl: './drivers.component.html',
    styleUrls: ['./drivers.component.scss'],
    animations: [routerTransition()]
})
export class DriversComponent implements OnInit {
    buttonNameAdd = '+ Add driver';
    buttonNameEdit = 'Edit';
    public drivers = [] as DriverView[];
    public originalDrivers = [] as DriverView[];
    search: string = '';

    constructor(private driverService: DriverService, private mapper: Mapper) {}

    ngOnInit() {
        this.getDrivers();
    }

    getDrivers() {
        this.drivers = [];
        this.driverService.getDrivers().subscribe((drivers) => {
            for (let d of drivers) {
                let driver: DriverView = this.mapper.mapDriverView(d);
                this.drivers.push(driver);
                this.originalDrivers.push(driver);
            }
        });
    }

    deleteDriver(driver: DriverView) {
        if (confirm('Are you sure to delete ' + driver.lastname + ' ' + driver.firstname + '?')) {
            try {
                this.driverService.deleteDriver(driver.userId);
            } catch (error) {
                console.info(error);
                console.error(error.message);
            }
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
