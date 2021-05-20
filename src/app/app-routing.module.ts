import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from './core/guard/auth.guard';
import {AdminGuard} from './core/guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./module/customer/index/index.module').then(m => m.IndexModule)
  },
  {
    path: 'admin/welcome',
    loadChildren: () => import('./module/welcome/welcome.module').then(m => m.WelcomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/product',
    loadChildren: () => import('./module/product/product.module').then(m => m.ProductModule),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin/auth',
    loadChildren: () => import('./module/auth/auth.module').then(m => m.AuthModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
