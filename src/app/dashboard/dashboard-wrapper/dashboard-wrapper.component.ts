import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SharedState } from '../../shared/store/shared.state'

@Component({
  selector: 'app-dashboard-wrapper',
  templateUrl: './dashboard-wrapper.component.html',
  styleUrls: ['./dashboard-wrapper.component.scss']
})
export class DashboardWrapperComponent implements OnInit {
  counter
  constructor() { }
  
  @Select(SharedState.getCartCount) cartCount$: Observable<number> 
  ngOnInit(): void {
    this.cartCount$.subscribe((count) => {
      this.counter = count
    })
  }

}
