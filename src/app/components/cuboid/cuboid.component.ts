import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cuboid',
  templateUrl: './cuboid.component.html',
  styleUrls: ['./cuboid.component.scss']
})
export class CuboidComponent implements OnInit {
  constructor() { }
  cuboidForm: FormGroup;
  loading: boolean = false;
  is_table_show: boolean = false;
  data: any = [];
  col2_data: any = [];
  col3_data: any[][] = [];
  unique_value: any = [];
  ngOnInit(): void {
    this.cuboidForm = new FormGroup({
      in_1: new FormControl(null, [Validators.required]),
      in_2: new FormControl(null, [Validators.required]),
      in_3: new FormControl(null, [Validators.required]),
      in_4: new FormControl(null, [Validators.required])
    });
  }

  onCuboid() {
    this.col2_data = [];
    this.col3_data = [];
    this.unique_value = [];
    this.loading = true;
    this.data = this.cuboidForm.value;
    console.log(this.data);
    this.col2_data.push(this.data.in_1 + this.data.in_2 + this.data.in_4);
    this.col2_data.push(this.data.in_2 + this.data.in_1 + this.data.in_3);
    this.col2_data.push(this.data.in_3 + this.data.in_2 + this.data.in_4);
    this.col2_data.push(this.data.in_4 + this.data.in_3 + this.data.in_1);
    console.log(this.col2_data);
    this.col3_data.push([this.data.in_1 + this.data.in_2, this.data.in_2 + this.data.in_4, this.data.in_1 + this.data.in_4]);
    this.col3_data.push([this.data.in_1 + this.data.in_2, this.data.in_1 + this.data.in_3, this.data.in_2 + this.data.in_3]);
    this.col3_data.push([this.data.in_2 + this.data.in_3, this.data.in_2 + this.data.in_4, this.data.in_3 + this.data.in_4]);
    this.col3_data.push([this.data.in_3 + this.data.in_4, this.data.in_1 + this.data.in_3, this.data.in_1 + this.data.in_4]);
    console.log(this.col3_data);
    this.unique_value.push(this.data.in_1 + this.data.in_2, this.data.in_2 + this.data.in_4, this.data.in_1 + this.data.in_4,this.data.in_1 + this.data.in_2, this.data.in_1 + this.data.in_3, this.data.in_2 + this.data.in_3,this.data.in_2 + this.data.in_3, this.data.in_2 + this.data.in_4, this.data.in_3 + this.data.in_4, this.data.in_3 + this.data.in_4, this.data.in_1 + this.data.in_3, this.data.in_1 + this.data.in_4);
    console.log(this.unique_value);
    var tmpset = new Set(this.unique_value);
    this.unique_value = [...tmpset];
    console.log(this.unique_value);
    this.loading = false;
    this.is_table_show = true;
  }
} 
