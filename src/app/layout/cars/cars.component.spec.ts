import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CarsComponent } from './cars.component';
import { CarsModule } from './cars.module';

describe('DriversComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CarsModule, RouterTestingModule]
        }).compileComponents();
    }));

    it('should create', () => {
        const fixture = TestBed.createComponent(CarsComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
