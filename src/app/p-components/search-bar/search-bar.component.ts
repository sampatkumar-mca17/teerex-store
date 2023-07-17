import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor() { }
  @Output() search = new EventEmitter()
  ngOnInit(): void {
  }

  onChange(value){
    this.search.emit(value)
  }

}
