import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullname'
})

export class FullnamePipe implements PipeTransform {

  private capitalizeFirstLetter(str: string) {
    if (!str) {
      return '';
    }

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  transform(name: string, surname: string): unknown {
    return `${this.capitalizeFirstLetter(name)} ${this.capitalizeFirstLetter(surname)}`;
  }

}
