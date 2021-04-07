import {RouterModule, Routes} from '@angular/router';
import {ProductDetailComponent} from './component/product-detail/product-detail.component';
import {ProductListComponent} from './component/product-list/product-list.component';
import {NgModule} from '@angular/core';
import {ProductFormComponent} from './component/product-form/product-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ProductListComponent
      },
      {
        path: 'detail/:id',
        component: ProductDetailComponent
      },
      {
        path: 'create',
        component: ProductFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}
