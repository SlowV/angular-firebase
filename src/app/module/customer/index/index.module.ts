import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './component/index/index.component';
import {IndexRoutingModule} from './index-routing.module';
import {CoreModule} from '../../../core/core.module';



@NgModule({
  declarations: [IndexComponent],
    imports: [
        CommonModule,
        IndexRoutingModule,
        CoreModule
    ]
})
export class IndexModule { }
