import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-dplcs',
  templateUrl: './dplcs.component.html',
  styleUrls: ['./dplcs.component.scss']
})
export class DPLCSComponent implements OnInit {
  url: any;
  constructor(private titleService: Title, private sanitize: DomSanitizer) {
    this.titleService.setTitle("DPLCS")
    this.url = this.sanitize.bypassSecurityTrustResourceUrl(environment.url + 'DPLCS.html');
  }

  ngOnInit(): void {
  }

}
