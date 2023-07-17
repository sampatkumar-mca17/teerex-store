import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  @Input() url:String;
  @Input() price:String;
  @Input() currency:String;
  @Input() id: number;
  @Output() addToCart = new EventEmitter()
  ngOnInit(): void {
  }

  addToCartClicked(){
    this.addToCart.emit(this.id)
  }

}
 