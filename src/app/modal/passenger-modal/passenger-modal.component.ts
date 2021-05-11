import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Passenger } from '../../domain/passenger.model';
import { PassengerService } from '../../services/passenger.service';

@Component({
  selector: 'app-passenger-modal',
  templateUrl: './passenger-modal.component.html',
  styleUrls: ['./passenger-modal.component.scss']
})
export class PassengerModalComponent implements OnInit {
  closeResult: string;
  @Input() passenger = {} as Passenger;
  @Input() edit: boolean;
  buttonName: string;
  titleModal: string = "";

  constructor(private modalService: NgbModal, private passengerService: PassengerService) {}

  ngOnInit(){
      if(this.edit){
          this.titleModal = "Edit passenger";
          this.buttonName = "Edit";
      }
      else{
          this.titleModal = "New passenger";
          this.buttonName = "+ Add passenger";
      }
  }

  savePassenger(){
      if(this.edit){
          this.editPassenger();
      }
      else{
          this.addPassenger();
      }
  }

  addPassenger() {
      console.info(this.passenger);
      this.passengerService.addPassenger(this.passenger);
      this.passenger = {};
      this.modalService.dismissAll('Save passenger');
  }

  editPassenger() {
      console.info(this.passenger);
      this.passengerService.editPassenger(this.passenger);
      this.passenger = {};
      this.modalService.dismissAll('Edit passenger');
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
