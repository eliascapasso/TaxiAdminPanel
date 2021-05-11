import { PassengersModule } from './passengers.module';

describe('PassengersModule', () => {
    let passengersModule: PassengersModule;

    beforeEach(() => {
        passengersModule = new PassengersModule();
    });

    it('should create an instance', () => {
        expect(passengersModule).toBeTruthy();
    });
});
