import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../sass/styles.scss']
})
export class HomeComponent implements OnInit {

  public sectionName: string;
  constructor() { }

  ngOnInit() {
    this.sectionName = 'Customer';
  }

  selectedTab(text: string) {
    this.sectionName = text;
  }
}
