import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoDemissao } from '../models/tipoDemissao';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class TipoDemissaoService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<TipoDemissao> {
    return this.http.get<TipoDemissao>(`${API_CONFIG.baseUrl}/api/tipoDemissao/${id}`);
  }

  findAll(): Observable<TipoDemissao[]> {
    return this.http.get<TipoDemissao[]>(`${API_CONFIG.baseUrl}/api/tipoDemissao`);
  }

  create(tipoDemissao: TipoDemissao): Observable<TipoDemissao> {
    return this.http.post<TipoDemissao>(`${API_CONFIG.baseUrl}/api/tipoDemissao`, tipoDemissao);
  }

  update(tipoDemissao: TipoDemissao): Observable<TipoDemissao> {
    return this.http.put<TipoDemissao>(`${API_CONFIG.baseUrl}/api/tipoDemissao/${tipoDemissao.id}`, tipoDemissao);
  }

  delete(id: any): Observable<TipoDemissao> {
    return this.http.delete<TipoDemissao>(`${API_CONFIG.baseUrl}/api/tipoDemissao/${id}`);
  }
}