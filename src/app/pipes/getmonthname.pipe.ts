import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getMonthName',
  standalone:true
})
export class GetMonthNamePipe implements PipeTransform {

  transform(value: Date | string): string | null {
    if (!value) return null;

    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      const months = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
      ];
      return months[date.getMonth()];
    } else {
      return null;
    }
  }

}
