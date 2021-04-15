import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from './core/guard/auth.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/admin/welcome'},
  {
    path: 'admin/welcome',
    loadChildren: () => import('./module/welcome/welcome.module').then(m => m.WelcomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/product',
    loadChildren: () => import('./module/product/product.module').then(m => m.ProductModule),
    canActivate: [AuthGuard]
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
