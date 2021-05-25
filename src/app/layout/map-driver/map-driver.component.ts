import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DriverService } from '../../services/driver.service';
import { routerTransition } from '../../router.animations';
import { merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Driver } from '../../domain/driver.model';

@Component({
    selector: 'app-map-driver',
    templateUrl: './map-driver.component.html',
    styleUrls: ['./map-driver.component.scss'],
    animations: [routerTransition()]
})
export class MapDriverComponent implements OnInit {
    @ViewChild('instance', { static: true }) instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    private drivers = [];
    public name: string;
    private driver: Driver = {};

    @ViewChild('iframe') iframe: ElementRef;

    search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(100), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map((term) =>
                (term === null
                    ? this.drivers.map(function (item: Driver) {
                          return item.name.toString();
                      })
                    : this.drivers
                          .map(function (item: Driver) {
                              return item.name.toString();
                          })
                          .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
                ).slice(0, 10)
            )
        );
    };

    constructor(public geolocation: Geolocation, private driverService: DriverService) {
        this.getDrivers();
    }

    ngOnInit(): void {
        //this.getGeolocation();
    }

    getDrivers() {
        this.driverService.getDrivers().subscribe((drivers) => {
            this.drivers = drivers;
        });
    }

    changeDriver() {
        for (let i = 0; i < this.drivers.length; i++) {
            if (this.drivers[i].name === this.name) {
                console.log(this.drivers[i]);
                this.driver = this.drivers[i];

                this.getGeolocation();
                break;
            }
        }
    }

    getGeolocation() {
        if (this.driver != {}) {
            this.iframe.nativeElement.src =
                'https://maps.google.com/maps?q=' +
                this.driver.geoPosition.latitude +
                ', ' +
                this.driver.geoPosition.longitude +
                '&z=15&output=embed';
        }

        // let watch = this.geolocation.watchPosition();
        // watch.subscribe((data: any) => {
        //     // data can be a set of coordinates, or an error (if an error occurred).

        //     this.lat = data.coords.latitude;
        //     this.lon = data.coords.longitude;

        // });
    }
}
