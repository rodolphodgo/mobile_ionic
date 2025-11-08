import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  /**
   * Limita o texto ao número de caracteres especificado e adiciona
   * @param value 
   * @param limit 
   * @returns 
   */
  transform(value: string, limit: number = 50): string {
    if (!value || value.length <= limit) {
      return value;
    }
    return value.substring(0, limit) + '...';
  }
}