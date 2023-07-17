import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { DashboardWrapperComponent } from './dashboard-wrapper/dashboard-wrapper.component';
import { ViewAllComponent } from './view-all/view-all.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardWrapperComponent,
    children:[
      {
        path:'view-all',
        component:ViewAllComponent
      },
      {
        path:'cart',
        component:CartComponent
      },
      {
        path:'',
        redirectTo:'view-all',
        pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
