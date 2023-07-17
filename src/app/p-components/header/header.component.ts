import { Component, Input, OnInit } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faCart = faCartPlus
  @Input() counter

  constructor() { }

  ngOnInit(): void {
   
  }

}
