import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-decision-theory',
  templateUrl: './decision-theory.component.html',
  styleUrls: ['./decision-theory.component.scss']
})
export class DecisionTheoryComponent implements OnInit {
  url: any;
  constructor(private title: Title, private sanitize: DomSanitizer) { 
    this.title.setTitle("Decision Theory");
    this.url = this.sanitize.bypassSecurityTrustResourceUrl(environment.url + 'DecisionTheory.html');
  }
  ngOnInit(): void {}
}
