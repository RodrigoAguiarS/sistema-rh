import { Injectable } from '@angular/core';
import { Vinculo } from '../models/vinculo';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VinculoService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Vinculo> {
    return this.http.get<Vinculo>(`${API_CONFIG.baseUrl}/api/vinculos/${id}`);
  }

  findAll(): Observable<Vinculo[]> {
    return this.http.get<Vinculo[]>(`${API_CONFIG.baseUrl}/api/vinculos`);
  }

  create(Vinculo: Vinculo): Observable<Vinculo> {
    return this.http.post<Vinculo>(`${API_CONFIG.baseUrl}/api/vinculos`, Vinculo);
  }

  update(vinculo: Vinculo): Observable<Vinculo> {
    return this.http.put<Vinculo>(`${API_CONFIG.baseUrl}/api/vinculos/${vinculo.id}`, vinculo);
  }

  delete(id: any): Observable<Vinculo> {
    return this.http.delete<Vinculo>(`${API_CONFIG.baseUrl}/api/vinculos/${id}`);
  }
}
