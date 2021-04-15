import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return this.secondsToDateTime(value);
  }

  secondsToDateTime(unixTimestamp): any {
    const milliseconds = unixTimestamp * 1000;
    return new Date(milliseconds).toLocaleString();
  }

}
