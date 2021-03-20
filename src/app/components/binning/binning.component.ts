import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-binning',
  templateUrl: './binning.component.html',
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }],
  styleUrls: ['./binning.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BinningComponent implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper;
  constructor(private titleService: Title) {
    this.titleService.setTitle("Binning");
  }
  binningForm: FormGroup;
  n_value_Form: FormGroup;

  loading: boolean = false;
  input_data: any[] = [];
  num_array: any = [];
  sorted_array: any = [];
  splitted_array: any = [];
  sum_array: any = [];
  bin_means: any = [];

  sum: number = 0;
  sum_by_total: number = 0;
  n_value: number = 0;

  ngOnInit(): void {
    this.binningForm = new FormGroup({
      bins: new FormControl("10,15,7,37,2,4,3,3,9,28,8")
    });
    this.n_value_Form = new FormGroup({
      n_value: new FormControl(null)
    });
  }

  onBinning(): void {
    this.loading = true;
    this.input_data.splice(0, this.input_data.length);
    this.input_data.push(this.binningForm.value.bins.split(","));
    //typecasting to number
    this.num_array = this.input_data[0].map(i => Number(i));
    //sorting
    this.sorted_array = this.num_array.sort((a, b) => { return a - b });
    //sum / total
    this.sum = this.sorted_array[this.sorted_array.length - 1] - this.sorted_array[0];
    this.sum_by_total = this.sum / this.sorted_array.length;
    this.loading = false;
    this.myStepper.next();
  }

  onAnswer(): void {
    this.loading = true;
    this.n_value = this.n_value_Form.value.n_value;
    this.splitted_array = this.splitToChunks(this.sorted_array);
    for (let i = 0; i < this.splitted_array.length; i++) {
      this.sum_array[i] = this.splitted_array[i].reduce((a, b) => a + b, 0) / this.splitted_array[i].length;
    }
    for (let i = 0; i < this.splitted_array.length; i++) {
      for (let j = 0; j < this.splitted_array[i].length; j++) {
        this.bin_means.push(this.sum_array[i]);
      }
    }
    this.bin_means = this.splitToChunks(this.bin_means);
    this.loading = false;
    this.myStepper.next();
  }

  splitToChunks(arr) {
    let result = [];
    for (let i = this.n_value; i > 0; i--) {
      result.push(arr.splice(0, Math.ceil(arr.length / i)));
    }
    return result;
  }

  onStepperReset(): void {
    this.num_array = [];
    this.sorted_array = [];
    this.splitted_array = [];
    this.sum_array = [];
    this.bin_means = [];
    this.myStepper.reset();
  }
}