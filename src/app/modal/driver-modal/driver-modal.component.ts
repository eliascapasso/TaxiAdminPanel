import { Component, Input } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../domain/user.model';
import { Driver } from '../../domain/driver.model';
import { DriverService } from '../../services/driver.service';
import { Role } from '../../../app/domain/role';
import { UserService } from '../../../app/services/user.service';

@Component({
    selector: 'app-driver-modal',
    templateUrl: './driver-modal.component.html',
    styleUrls: ['./driver-modal.component.scss']
})
export class DriverModalComponent {
    closeResult: string;
    @Input() driver = {} as Driver;
    @Input() edit: boolean;
    user = {} as User;
    buttonName: string;
    titleModal: string = '';
    editingDriver: Driver;
    errorMessage: string = "";

    constructor(
        private modalService: NgbModal,
        private driverService: DriverService,
        private userService: UserService
    ) {}

    ngOnInit() {
        if (this.edit) {
            this.titleModal = 'Edit driver';
            this.buttonName = 'Edit';
            this.userService.getUsers().subscribe(users=>{
                for(let u of users){
                    if(u.id == this.driver.userId){
                        this.user = u;
                        this.user.id = this.driver.userId;
                        break;
                    }
                }
            });
        } else {
            this.titleModal = 'New driver';
            this.buttonName = '+ Add driver';
        }
    }

    saveDriver() {
        if (this.edit) {
            this.editDriver();
        } else {
            this.addDriver();
        }
    }

    async addDriver() {
        this.errorMessage = "";

        this.user.role = [];
        this.user.role.push(Role.DRIVER);
        this.user.enabled = true;

        try{
            this.driverService.addDriver(this.driver, this.user);
            
            console.assert('Successfully created driver!');
            console.info(this.driver);

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
        
        this.user.role = [];
        this.user.role.push(Role.DRIVER);
        this.user.enabled = true;

        try{
            this.driverService.editDriver(this.driver, this.user);

            console.assert('Successfully edited driver!');
            console.info(this.driver);

            this.driver = {};
            this.modalService.dismissAll('Edit driver');
        }catch(error){
            console.warn(error.message);
            this.errorMessage = error.message;
        }
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
