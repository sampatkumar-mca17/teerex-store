import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-content-with-sidebar',
  templateUrl: './content-with-sidebar.component.html',
  styleUrls: ['./content-with-sidebar.component.scss']
})
export class ContentWithSidebarComponent implements OnInit {

  constructor() { }
  @Output() filterApplied = new EventEmitter
  ngOnInit(): void {
  }

}
