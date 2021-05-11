import { MapDriverModule } from './map-driver.module';

describe('MapDriverModule', () => {
    let mapDriverModule: MapDriverModule;

    beforeEach(() => {
        mapDriverModule = new MapDriverModule();
    });

    it('should create an instance', () => {
        expect(mapDriverModule).toBeTruthy();
    });
});
