import { cartDetails } from "./shared.models";

export class AddCartCount {
    static readonly type = '[Dashboard] Add Cartcount';
  }

  export class RemoveCartCount {
    static readonly type = '[Dashboard] Remove Cartcount';
    constructor(public count:number){}
  }

  export class UpdateCartCount {
    static readonly type = '[Dashboard] Update Cartcount';
    constructor(public count:number){}
  }

export class AddProducts {
    static readonly type = '[Dashboard] Add Products';
    constructor(public products: Array<any> ) {}
  }

  export class UpdateProducts {
    static readonly type = '[Dashboard] Add Products';
    constructor(public products: Array<any> ) {}
  }

export class AddToCart {
  static readonly type= "[Dashboard] Add Cart"
  constructor(public cartDetails: cartDetails[]){}
}