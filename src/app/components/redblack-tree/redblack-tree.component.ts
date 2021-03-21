import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-redblack-tree',
  templateUrl: './redblack-tree.component.html',
  styleUrls: ['./redblack-tree.component.scss']
})
export class RedblackTreeComponent implements OnInit {
  url: any;
  constructor(private titleService: Title, private sanitize: DomSanitizer) {
    this.titleService.setTitle("Red Black Tree");
    this.url = this.sanitize.bypassSecurityTrustResourceUrl(environment.url + 'RedBlack.html');
  }

  ngOnInit(): void {
  }
}
