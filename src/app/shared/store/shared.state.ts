import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddCartCount, AddProducts, AddToCart, RemoveCartCount, UpdateCartCount, UpdateProducts } from './shared.actions';
import { teerexStateModel } from './shared.models';

@State<teerexStateModel>({
  name: 'teerexState',
  defaults: {
    totalCartCount:0,
    products:[],
    cartDetails:[]
  }
})
@Injectable()
export class SharedState {
  @Action(AddCartCount)
  addCartCount(ctx: StateContext<teerexStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      totalCartCount:state.totalCartCount+1
    });
  }

  @Action(AddProducts) 
    AddProducts(ctx:StateContext<teerexStateModel>, action:AddProducts){
      const state = ctx.getState();
      ctx.setState({
        ...state,
        products:[...state.products,...action.products]
      })
    }

    @Action(UpdateProducts) 
    UpdateProducts(ctx:StateContext<teerexStateModel>, action:UpdateProducts){
      const state = ctx.getState();
      ctx.setState({
        ...state,
        products:[...action.products]
      })
    }
  
    @Action(AddToCart)
    AddToCart(ctx:StateContext<teerexStateModel>, action:AddToCart){
      const state = ctx.getState()
      ctx.setState({
        ...state,
        cartDetails:action.cartDetails
      })
    }
    
    @Action(RemoveCartCount)
    RemoveCartCount(ctx:StateContext<teerexStateModel>, action:RemoveCartCount){
      const state = ctx.getState()
      ctx.setState({
        ...state,
        totalCartCount:state.totalCartCount-action.count
      })
    }

    @Action(UpdateCartCount)
    UpdateCartCount(ctx:StateContext<teerexStateModel>, action:RemoveCartCount){
      const state = ctx.getState()
      ctx.setState({
        ...state,
        totalCartCount:action.count
      })
    }

  @Selector()
  static getCartCount(state: teerexStateModel) {
    return state.totalCartCount;
  }

  @Selector()
  static getProducts(state: teerexStateModel){
    return state.products
  }

  @Selector()
  static getCartDetails(state: teerexStateModel){
    return state.cartDetails
  }
}