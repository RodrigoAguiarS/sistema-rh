import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '../models/empresa';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  create(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(`${API_CONFIG.baseUrl}/api/empresas`, empresa);
  }

  findById(id: any): Observable<Empresa> {
    return this.http.get<Empresa>(`${API_CONFIG.baseUrl}/api/empresas/${id}`);
  }

  findAll(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${API_CONFIG.baseUrl}/api/empresas`);
  }

  update(empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${API_CONFIG.baseUrl}/api/empresas/${empresa.id}`, empresa);
  }

  delete(id: any): Observable<Empresa> {
    return this.http.delete<Empresa>(`${API_CONFIG.baseUrl}/api/empresas/${id}`);
  }
}
