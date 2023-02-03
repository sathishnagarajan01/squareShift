import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { CartComponent } from '../cart/cart.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [
    ProductComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule
  ]
})
export class ProductModule { }
