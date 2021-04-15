import {RouterModule, Routes} from '@angular/router';
import {ProductDetailComponent} from './component/product-detail/product-detail.component';
import {ProductListComponent} from './component/product-list/product-list.component';
import {NgModule} from '@angular/core';
import {ProductFormComponent} from './component/product-form/product-form.component';
import {AuthGuard} from '../../core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ProductListComponent,
        canActivateChild: [AuthGuard]
      },
      {
        path: 'detail/:id',
        component: ProductDetailComponent,
        canActivateChild: [AuthGuard]
      },
      {
        path: 'create',
        component: ProductFormComponent,
        canActivateChild: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}
