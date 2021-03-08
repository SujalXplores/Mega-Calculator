import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-redblack-tree',
  templateUrl: './redblack-tree.component.html',
  styleUrls: ['./redblack-tree.component.scss']
})
export class RedblackTreeComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle("Red Black Tree")
  }

  ngOnInit(): void {
  }
}
