import {NgModule} from '@angular/core';
import {IconDefinition} from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import {NZ_ICONS, NzIconModule} from 'ng-zorro-antd/icon';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};

const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => {
  return antDesignIcons[key];
});

/**
 * Include this module in every testing spec, except `icon.spec.ts`.
 */
// @dynamic
@NgModule({
  exports: [NzIconModule],
  providers: [
    {
      provide: NZ_ICONS,
      useValue: icons
    }
  ]
})
export class IconsProviderModule {
}
