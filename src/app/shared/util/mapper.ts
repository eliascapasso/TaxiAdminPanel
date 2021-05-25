import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Driver } from '../../../app/domain/driver.model';
import { UserService } from '../../../app/services/user.service';
import { DriverView } from '../../../app/domain/driverView.model';

@NgModule({
    imports: [CommonModule],
    declarations: []
})
export class Mapper {
    constructor(private userService: UserService) {}

    mapDriverView(d: Driver): DriverView {
        let driver: DriverView = {};
        let user = this.userService.getUser(d.userId);

        driver.driverId = d.id;
        driver.geoPosition = d.geoPosition;
        driver.socialId = d.socialId;

        driver.userId = d.userId;
        driver.address = user.address;
        driver.email = user.email;
        driver.firstname = user.firstname;
        driver.lastname = user.lastname;
        driver.lineNumber = user.lineNumber;
        driver.phoneNumber = user.phoneNumber;
        driver.enabled = user.enabled;

        return driver;
    }
}
