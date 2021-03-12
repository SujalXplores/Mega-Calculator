import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dplcs',
  templateUrl: './dplcs.component.html',
  styleUrls: ['./dplcs.component.scss']
})
export class DPLCSComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle("DPLCS")
  }

  ngOnInit(): void {
  }

}
