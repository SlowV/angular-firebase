import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/admin/welcome'},
  {path: 'admin/welcome', loadChildren: () => import('./module/welcome/welcome.module').then(m => m.WelcomeModule)},
  {
    path: 'admin/product',
    loadChildren: () => import('./module/product/product.module').then(m => m.ProductModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
