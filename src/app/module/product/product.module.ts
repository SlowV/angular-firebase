import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import {ProductRoutingModule} from './product-routing.module';
import {CoreModule} from '../../core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductFormComponent } from './component/product-form/product-form.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent, ProductFormComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    CKEditorModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProductModule { }
