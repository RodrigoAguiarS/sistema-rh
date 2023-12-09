import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  linhaImpar(index: number): boolean {
    return index % 2 !== 0;
  }
}
