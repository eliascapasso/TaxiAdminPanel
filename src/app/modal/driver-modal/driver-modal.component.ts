import { Component, Input } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../domain/user.model';
import { AuthService } from '../../services/auth.service';
import { Driver } from '../../domain/driver.model';
import { DriverService } from '../../services/driver.service';
import * as firebase from 'firebase';

@Component({
    selector: 'app-driver-modal',
    templateUrl: './driver-modal.component.html',
    styleUrls: ['./driver-modal.component.scss']
})
export class DriverModalComponent {
    closeResult: string;
    @Input() driver = {} as Driver;
    @Input() edit: boolean;
    buttonName: string;
    titleModal: string = '';
    editingDriver: Driver;
    errorMessage: string = "";

    constructor(
        public authService: AuthService,
        private modalService: NgbModal,
        private driverService: DriverService
    ) {}

    ngOnInit() {
        if (this.edit) {
            this.titleModal = 'Edit driver';
            this.buttonName = 'Edit';
        } else {
            this.titleModal = 'New driver';
            this.buttonName = '+ Add driver';
        }
    }

    saveDriver() {
        if (this.edit) {
            console.info('hola');
            this.editDriver();
        } else {
            this.addDriver();
        }
    }

    async addDriver() {
        this.errorMessage = "";

        let user: User = {
            email: this.driver.email,
            pass: this.driver.password
        };

        try{
            await this.authService.onRegistrer(user);
            
            console.assert('Successfully created user!');
            console.info(this.driver);

            this.driverService.addDriver(this.driver);
            this.driver = {};
            this.modalService.dismissAll('Save driver');
        }
        catch(error){
            console.warn(error.message);
            this.errorMessage = error.message;
        }
        
    }

    editDriver() {
        console.info(this.driver);
        this.editingDriver = this.driver;
        this.driverService.editDriver(this.driver);
        this.driver = {};
        this.modalService.dismissAll('Edit driver');
    }

    open(content) {
        this.modalService.open(content).result.then(
            (result) => {
                this.closeResult = `Closed with: ${result}`;
                location.reload();
            },
            (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}
