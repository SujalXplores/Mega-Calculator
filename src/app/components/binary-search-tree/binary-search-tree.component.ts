import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-binary-search-tree',
  templateUrl: './binary-search-tree.component.html',
  styleUrls: ['./binary-search-tree.component.scss']
})
export class BinarySearchTreeComponent implements OnInit {
  url: any;
  constructor(private titleService: Title, private sanitize: DomSanitizer) {
    this.titleService.setTitle("BST");
    this.url = this.sanitize.bypassSecurityTrustResourceUrl(environment.url + 'BST.html');
  }

  ngOnInit(): void {
  }

}
