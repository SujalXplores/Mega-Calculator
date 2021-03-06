import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-chi-square-test',
  templateUrl: './chi-square-test.component.html',
  styleUrls: ['./chi-square-test.component.scss']
})
export class ChiSquareTestComponent implements OnInit {
  title = 'Chi Square Test';
  constructor(private titleService: Title) { 
    this.titleService.setTitle("Chi Square Test");
  }

  ngOnInit(): void {
  }

}
