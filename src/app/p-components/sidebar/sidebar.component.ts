import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { convertToArray } from '../../shared/array';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  filters = {
    color:[],
    type:[],
    price:[],
    gender:[]
  }
  @Output() filterApplied = new EventEmitter
  constructor() { }

  ngOnInit(): void {
  }

  onChange($event){
    let eventArr = convertToArray($event.value, ',')
    this.handleFilterActions(eventArr, $event)
    this.filterApplied.emit(this.filters)
    
  }

  handleFilterActions(eventArr, $event){
    if(this.filters[eventArr[0]]){
      $event.checked?this.pushToFilters(eventArr):this.removeFromFilters(eventArr)
    }
    else{
      this.filters[eventArr[0]] = [eventArr[1]]
    }
  }

  pushToFilters(eventArr){
    this.filters[eventArr[0]].push(eventArr[1])
  }

  removeFromFilters(eventArr){
    let removeIndex = this.filters[eventArr[0]].indexOf(eventArr[1])
    this.filters[eventArr[0]].splice(removeIndex,1)
  }
} 
