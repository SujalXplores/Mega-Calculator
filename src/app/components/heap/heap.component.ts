import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-heap',
  templateUrl: './heap.component.html',
  styleUrls: ['./heap.component.scss']
})
export class HeapComponent implements OnInit {
  url: any;
  constructor(private titleService: Title, private sanitize: DomSanitizer) {
    this.titleService.setTitle("Heap Sort");
    this.url = this.sanitize.bypassSecurityTrustResourceUrl(environment.url + 'Heap.html');
  }

  ngOnInit(): void {
  }

}
