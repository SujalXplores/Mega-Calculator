import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-decision-theory',
  templateUrl: './decision-theory.component.html',
  styleUrls: ['./decision-theory.component.scss']
})
export class DecisionTheoryComponent implements OnInit {

  constructor(private title: Title) { 
    this.title.setTitle("Decision Theory");
  }

  ngOnInit(): void {
  }

}
