import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  constructor() { }
  @Input() length;
  @Input () pageSize;
  @Input () pageSizeOptions
  @Input () disabled

  @Output() paginationUpdate = new EventEmitter()
  
  ngOnInit(): void {
  }

  onPageEvent($event){
    this.paginationUpdate.emit($event)
  }

}
