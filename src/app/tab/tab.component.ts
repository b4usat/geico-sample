import { Component, OnInit, Output } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  @Output() tabSelection = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onTabClick(event: MatTabChangeEvent) {
    this.tabSelection.emit(event.tab.textLabel);
  }

}
