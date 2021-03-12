import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-heap',
  templateUrl: './heap.component.html',
  styleUrls: ['./heap.component.scss']
})
export class HeapComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle("Heap Sort")
  }

  ngOnInit(): void {
  }

}
