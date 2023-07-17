import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PComponentsModule } from '../p-components/p-components.module'
import { ViewAllComponent } from './view-all/view-all.component';
import { DashboardWrapperComponent } from './dashboard-wrapper/dashboard-wrapper.component';
import { DashboardService } from './dashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatMenuModule } from '@angular/material/menu'
import { ContentWithSidebarComponent } from './view-all/content-with-sidebar/content-with-sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CartComponent } from './cart/cart.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    ViewAllComponent,
    DashboardWrapperComponent,
    ContentWithSidebarComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PComponentsModule,
    HttpClientModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      enableHtml:true,
      positionClass:'toast-bottom-right',
      closeButton:true,
      preventDuplicates:true
    })
  ],
  providers:[DashboardService, ToastrService]
})
export class DashboardModule { }
