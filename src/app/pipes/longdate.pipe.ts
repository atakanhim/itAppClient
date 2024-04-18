import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'longdate',
  standalone: true
})
export class LongdatePipe implements PipeTransform {

  transform(value: string | number | Date): string {
    // Verilen değeri bir tarih nesnesine dönüştür
    const date = new Date(value);
    // Tarihi uzun tarih biçimine dönüştür ve sonucu döndür
    return date.toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

}
