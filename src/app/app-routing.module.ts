import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './layouts/main/main.component';
import { DetialProductComponent } from './detial-product/detial-product.component';
import { ViewMoreComponent } from './view-more/view-more.component';
import { CheckoutsComponent } from './checkouts/checkouts.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,  
    children: [ 
      {
        path: '', 
        canActivate : [],
        component : HomeComponent, 
      },
      {
        path: 'detail-product', 
        canActivate : [],
        component : DetialProductComponent, 
      },
      {
        path: 'shop-more', 
        canActivate : [],
        component : ViewMoreComponent, 
      },
      {
        path: 'checkouts', 
        canActivate : [],
        component : CheckoutsComponent, 
      },
      {
        path: 'payment', 
        canActivate : [],
        component : PaymentComponent, 
      },
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
