import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Pipe({
  name: 'imageAsync'
})
export class ImagePipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {
  }

  async transform(src: string): Promise<SafeUrl> {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(src);
  }


}
