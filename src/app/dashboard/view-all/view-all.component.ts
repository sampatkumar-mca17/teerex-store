import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { cartDetails, products } from '../../shared/store/shared.models';
import { SharedState } from 'src/app/shared/store/shared.state';
import { DashboardService } from '../dashboard.service';
import { AddCartCount, AddProducts, AddToCart } from 'src/app/shared/store/shared.actions';
import { ToastrService } from 'ngx-toastr';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent implements OnInit {
  @Select(SharedState.getProducts) getProducts$: Observable<products>
  @Select(SharedState.getCartDetails) getCartDetails$: Observable<cartDetails[]>
  private subscriptoins: Subscription = new Subscription()
  constructor(
    private _service: DashboardService,
    private _store: Store,
    private _toastr: ToastrService 
  ) { }

  products = []
  filteredProducts = []
  paginatedProducts = []
  pageSize = 10
  pageIndex = 0
  length;
  pageSizeOptions = [5,10,25,100]
  isPaginationDisabled = false
  cartDetails:cartDetails[];

  faFilter = faFilter

  ngOnInit(): void {
    this.subscriptoins.add(
      this.getProducts$.subscribe((products: any) => {
        if (products.length) {
          this.products = products
          this.filteredProducts = products
          this.length = this.products.length
          this.onPaginationUpdate({pageSize:10, pageIndex:0})
        }
        else {
          this.getProducts()
        }

      })
    )

    this.subscriptoins.add(
      this.getCartDetails$.subscribe((cartDetails:cartDetails[])=>{
        this.cartDetails = cartDetails
      })
    )

   
  }

  getProducts() {
    this._service.getProducts().subscribe((products: any) => {
      this.updateState(new AddProducts(products))
    })
  }


  updateState(action) {
    this._store.dispatch(action)
  }

  onFilterApplied($event?, value?) {
    if($event){
      return this.applyFilterWithType($event)
    }
    else if(value !== undefined){
     return this.applyFilterWithMatch(value)
    }
    return []

  }

  applyFilterWithType($event){
    if ($event.color.length || $event.price.length || $event.type.length || $event.gender.length) {
      this.filteredProducts = this.products.filter((item) => {

        if ($event.color.length && !$event.color.includes(item.color.toLowerCase())) {
          return false
        }

        if ($event.type.length && !$event.type.includes(item.type.toLowerCase())) {
          return false
        }

        if ($event.gender.length && !$event.gender.includes(item.gender.toLowerCase())) {
          return false
        }

        if ($event.price.length) {
          let filteredPrices = this.getFilteredPrices($event.price, item.price)

          if (!filteredPrices.length) {
            return false
          }
        }
        return true
      })
      this.applyPaginationOnFilter(this.filteredProducts)
    }
    else {
      this.applyPaginationOnFilter(this.products)
    }
  }

  applyFilterWithMatch(value){
    
    this.paginatedProducts =  this.filteredProducts.filter((item) => {
     return item.name.toLowerCase().match(value.toLowerCase()) || item.type.toLowerCase().match(value.toLowerCase()) || item.color.toLowerCase().match(value.toLowerCase())
    })
  }

  applyPaginationOnFilter(products){
      this.length = products.length
      this.filteredProducts = [...products]
      this.onPaginationUpdate({pageSize:this.pageSize, pageIndex:this.pageIndex})
  }
  getFilteredPrices(prices, price) {
    return prices.filter((priceStr, i) => {
      let range = priceStr.split('-')
      if (price >= parseInt(range[0])) {
        if (range[1]) {
          return price <= parseInt(range[1])
        }
        return true
      }
      return false
    })
  }

  onPaginationUpdate($event){
    if($event === 'noPagination'){  
      this.isPaginationDisabled = true
    }
    else{
      this.isPaginationDisabled = false
      this.pageSize = $event.pageSize
      this.pageIndex = $event.pageIndex
      this.paginatedProducts = [...this.filteredProducts]
      this.paginatedProducts = this.filteredProducts.filter((item,i) => {
        let paginationRangeCheck =  i < $event.pageSize*($event.pageIndex+1) && i >= $event.pageSize*$event.pageIndex 
        return paginationRangeCheck
      
      })
    }
    
  }

  onAddToCart(id){
    let currentCartDetails;
    let product = this.products.filter((item) => id === item.id)[0]
    if(this.cartDetails.length){
      currentCartDetails = this.cartDetails.filter((cart)=>cart.id === id)[0]
    }
    if((!currentCartDetails&&product.quantity) || (currentCartDetails&&(currentCartDetails.quantity < product.quantity))){
      this.updateState(new AddCartCount())
      let latestCartDetails = this.getCartDetails(currentCartDetails, id)
      this.updateState(new AddToCart(latestCartDetails))
      this._toastr.success(`${product.name} has been added to your cart`, 'Success')
    }
    else{
      this._toastr.error(`Cart limit for ${product.name} exceeded`, 'Limit exceeded')
    }
    
  }

  getCartDetails(currentCartDetails, id){
    let cartDetails = [...this.cartDetails,{id:id,quantity:1}]
      if(currentCartDetails){
         cartDetails = this.cartDetails.map((item) => {
          if(item.id === id){
            return {...item,id:id,quantity:currentCartDetails.quantity+1}
          }
          return item
        })
      }
      return cartDetails
  }
  
  onSearch(value){
    if(!value){
      this.onPaginationUpdate({pageSize:this.pageSize, pageIndex:this.pageIndex})
    }
    else{
      this.onPaginationUpdate('noPagination')
      this.onFilterApplied(undefined, value)
    }
  }

}


