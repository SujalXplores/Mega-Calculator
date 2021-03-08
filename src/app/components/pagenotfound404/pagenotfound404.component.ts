import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pagenotfound404',
  templateUrl: './pagenotfound404.component.html',
  styleUrls: ['./pagenotfound404.component.scss']
})
export class Pagenotfound404Component implements OnInit {

  constructor(private titleService: Title) { 
    this.titleService.setTitle("404 Page not found")
  }

  ngOnInit(): void {
  }

}
