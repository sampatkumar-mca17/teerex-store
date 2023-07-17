import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { AddToCart, RemoveCartCount, UpdateCartCount, UpdateProducts } from 'src/app/shared/store/shared.actions';
import { cartDetails, products } from 'src/app/shared/store/shared.models';
import { SharedState } from 'src/app/shared/store/shared.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private _store:Store,
    private _route:Router
    ) { }
  @Select(SharedState.getCartDetails) getCartDetails$: Observable<cartDetails[]>
  @Select(SharedState.getProducts) getProducts$: Observable<products[]>
  @Select(SharedState.getCartCount) getCartCount$: Observable<number>
  totalPrice = 0
  cartDetails
  filteredProducts
  cartCount
  subscriptions = new Subscription()
  paymentHandler:any = null;
  
  ngOnInit(): void {
    this.subscriptions.add(
      this.getCartDetails$.pipe(switchMap((cartDetails) => {
        this.cartDetails = cartDetails
        return this.getProducts$
      })).subscribe((products) => {
        this.filteredProducts = this.filterProducts(products)
      })
    )

    this.subscriptions.add(
      this.getCartCount$.subscribe((count) => {
        this.cartCount = count
      })
    )
    this.loadStripe()
    
  }

  filterProducts(products) {
    let convertedCardDetails = {}
    this.cartDetails.map((item) => {
      convertedCardDetails[item.id] = item.quantity
    })
    let filteredProducts = []
    this.totalPrice = 0;
    products.map((product: any) => {
      if (convertedCardDetails[product.id]) {
        let quantities = Array(product.quantity).fill(false)
        filteredProducts.push({ ...product, quantities: quantities, selectedQuantity:convertedCardDetails[product.id], totalPrice:product.price*convertedCardDetails[product.id] })
        this.totalPrice += product.price*convertedCardDetails[product.id]
      }
    })
    return filteredProducts
  }

  deleteCart(product) {
    let quantity = product.selectedQuantity
    this.filteredProducts = this.filteredProducts.filter((item) => item.id !== product.id)
    let cartDetails = this.cartDetails.filter((item) => item.id !== product.id)
    this.updateState(new RemoveCartCount(quantity),new AddToCart(cartDetails))
  }

  onSelectionChange($event, id){
    let cartDetails = JSON.parse(JSON.stringify(this.cartDetails))
    cartDetails = this.updateCartDetailsQuantity(cartDetails, id, $event.value)
    let product = this.filteredProducts.filter((product) => product.id === id)[0]
    let cartCountAction = this.getCartCounAction($event.value < product.selectedQuantity, product.selectedQuantity, $event.value) 
    this.updateState(cartCountAction, new AddToCart(cartDetails))
    this.updateSelectedQuantity(id, $event.value)
    
  }

  onCheckOutAndPayment(){
    this.pay(this.totalPrice)
  }
  getCartCounAction(condition, selectedQuantity, quantityToBeUpdated){
    switch(condition){
      case true: return new RemoveCartCount(Math.abs(selectedQuantity - quantityToBeUpdated))
      default: return new UpdateCartCount(this.cartCount+( quantityToBeUpdated - selectedQuantity ))
    }
  }

  updateCartDetailsQuantity(cartDetails,id,quantity){
    return cartDetails.map((item) => {
      if(item.id === id){
        item.quantity = quantity
      }
      return item
    })
  }

  updateSelectedQuantity(id, selectedQuantity){
    this.filteredProducts = this.filteredProducts.map((product) => {
      if(product === id){
        product.selectedQuantity = selectedQuantity
      }
      return product
    })
  }

  updateState(...actions){
    this._store.dispatch(actions)
  }
  
  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }

}
pay(amount) {    
  const that =this
  var handler = (<any>window).StripeCheckout.configure({
    key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
    locale: 'auto',
    token: function (token: any) {
      // You can access the token ID with `token.id`.
      // Get the token ID to your server-side code for use.
     that.updateState(new UpdateProducts([]))
     that.updateState(new AddToCart([]))
     that.updateState(new UpdateCartCount(0))
     that._route.navigate(['view-all'])
    }
  });

  handler.open({
    name: 'Teerex store',
    description: 'Payment',
    amount: amount * 100
  });

}
}
