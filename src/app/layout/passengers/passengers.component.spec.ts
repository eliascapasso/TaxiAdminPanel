import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PassengersComponent } from './passengers.component';
import { PassengersModule } from './passengers.module';

describe('DriversComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [PassengersModule, RouterTestingModule]
        }).compileComponents();
    }));

    it('should create', () => {
        const fixture = TestBed.createComponent(PassengersComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
