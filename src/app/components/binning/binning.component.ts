import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-binning',
  templateUrl: './binning.component.html',
  styleUrls: ['./binning.component.scss']
})
export class BinningComponent implements OnInit {

  constructor(private titleService: Title) { 
    this.titleService.setTitle("Binning");
  }

  ngOnInit(): void {
  }

}
