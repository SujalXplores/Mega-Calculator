import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-master-theorm',
  templateUrl: './master-theorm.component.html',
  styleUrls: ['./master-theorm.component.scss']
})
export class MasterTheormComponent implements OnInit {
  url: any;
  constructor(private title: Title, private sanitize: DomSanitizer) { 
    this.title.setTitle("Master Theorm");
    this.url = this.sanitize.bypassSecurityTrustResourceUrl(environment.url + 'masterTheorm.html');
  }

  ngOnInit(): void {
  }

}
