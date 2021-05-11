import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from '../../domain/car.model';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-modal',
  templateUrl: './car-modal.component.html',
  styleUrls: ['./car-modal.component.scss']
})
export class CarModalComponent implements OnInit {
  closeResult: string;
  @Input() car = {} as Car;
  @Input() edit: boolean;
  buttonName: string;
  titleModal: string = "";
  editingCar: Car;

  constructor(private modalService: NgbModal, private carService: CarService) {}

  ngOnInit(){
      if(this.edit){
          this.titleModal = "Edit car";
          this.buttonName = "Edit";
      }
      else{
          this.titleModal = "New car";
          this.buttonName = "+ Add car";
      }
  }

  saveCar(){
      if(this.edit){
          console.info("hola");
          this.editCar();
      }
      else{
          this.addCar();
      }
  }

  addCar() {
      console.info(this.car);
      this.carService.addCar(this.car);
      this.car = {};
      this.modalService.dismissAll('Save car');
  }

  editCar() {
      console.info(this.car);
      this.editingCar = this.car;
      this.carService.editCar(this.car);
      this.car = {};
      this.modalService.dismissAll('Edit car');
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
