import { Injectable } from '@angular/core';
import { TipoDesconto } from '../models/tipoDesconto';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoDescontoService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<TipoDesconto> {
    return this.http.get<TipoDesconto>(`${API_CONFIG.baseUrl}/api/descontos/${id}`);
  }

  findAll(): Observable<TipoDesconto[]> {
    return this.http.get<TipoDesconto[]>(`${API_CONFIG.baseUrl}/api/descontos`);
  }

  create(descontos: TipoDesconto): Observable<TipoDesconto> {
    return this.http.post<TipoDesconto>(`${API_CONFIG.baseUrl}/api/descontos`, descontos);
  }

  update(descontos: TipoDesconto): Observable<TipoDesconto> {
    return this.http.put<TipoDesconto>(`${API_CONFIG.baseUrl}/api/descontos/${descontos.id}`, descontos);
  }

  delete(id: any): Observable<TipoDesconto> {
    return this.http.delete<TipoDesconto>(`${API_CONFIG.baseUrl}/api/descontos/${id}`);
  }
}