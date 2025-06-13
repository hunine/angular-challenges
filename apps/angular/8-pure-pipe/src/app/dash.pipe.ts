import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dash',
  pure: true,
})
export class DashPipe implements PipeTransform {
  transform(name: string, index: number): string {
    return `${name} - ${index}`;
  }
}
