import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataService } from '../services/app.services';
import { YearCollection, CarModel, Selections } from '../services/model';
import { TransfromArray } from '../utilities/pipes';
import { MatSelectChange, MatSelect, MatRadioChange, ErrorStateMatcher } from '@angular/material';
import * as _ from 'lodash';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';


// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.scss', '../../sass/styles.scss'],
  providers: [TransfromArray]
})
export class TabContentComponent implements OnInit {

  @Input() selectTab: string;
  private mytab: boolean;
  private isSaveAnother: boolean;
  private selections: Selections = new Selections();
  private yearCollection: YearCollection = new YearCollection();
  private carManufacturer: CarModel = new CarModel();
  private model: CarModel = new CarModel();
  private device: CarModel = new CarModel();
  private vehicleDetails: Selections[] = [];
  private showGrid: boolean;
  private showSecondForm: boolean;
  private editEnabled: boolean;
  private counter: number;
  @ViewChild('carmodel') carModelSelect: MatSelect;
  @ViewChild('selectAnnualMileage') selectAnnualMileage: MatSelect;
  // matcher = new MyErrorStateMatcher();
  constructor(private dataService: DataService) {
    this.counter = 0;
  }

  ngOnInit() {
    this.showContent(this.selectTab);
    this.showGrid = false;
    this.showSecondForm = true;
    this.editEnabled = false;
  }

  onCarManufacturerSelect(event: MatSelectChange): void {
    this.dataService.loadCarModel(event.value.toUpperCase())
      .subscribe((models: CarModel) => {
        this.carModelSelect.disabled = false;
        this.carModelSelect.focus();
        this.carModelSelect.open();
        this.model = models;
      });
  }

  onOwnershipChange(event: MatRadioChange): void {

  }

  onModeChange(event: MatRadioChange): void {
    console.log(event);
    if (event.value === '1') {
      this.selections.miles = 15000;
    } else if (event.value === '2') {
      this.selections.miles = 12000;
    } else if (event.value === '3') {
      this.selections.miles = 20000;
    }
  }

  onlyNumberKey(event): boolean {
    return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  showContent(tabname): void {
    this.mytab = (tabname.toUpperCase() === 'VEHICLE');
    if (this.mytab) {
      this.dataService.loadyears().subscribe((data) => {
        this.yearCollection = data;
        // console.log(data);
      });
      this.dataService.loadCarManufacturer().subscribe((car: CarModel) => {
        this.carManufacturer = car;
        // console.log(car);
      });
      this.dataService.loadAntiTheftDevice().subscribe((data: CarModel) => {
        this.device = data;
      });
    }

  }

  saveVehicleDetails(form): void {
    if (form.valid) {
      const isavail = _.find(this.vehicleDetails, (x) => x.Id === this.selections.Id);
      console.log(isavail);
      this.counter += 1;
      this.selections.Id = this.counter;

      this.vehicleDetails.push(this.selections);
      this.selections = new Selections();
      this.showGrid = true;
      this.carModelSelect.disabled = true;
      this.showSecondForm = this.isSaveAnother;
      this.editEnabled = false;
    }

    this.isSaveAnother = false;
  }

  editClick(id: number): void {
    const obj = this.vehicleDetails[id - 1];
    this.selections = obj;
    // this.carModelSelect.disabled = false;
    this.editEnabled = true;
    this.showSecondForm = true;
  }
}
