import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { RegistroPonto } from '../models/registroPonto';

@Injectable({
  providedIn: 'root'
})
export class RegistroPontoService {

  constructor(private http: HttpClient) { }

  registrarPonto(registro: RegistroPonto): Observable<RegistroPonto> {
    return this.http.post<RegistroPonto>(`${API_CONFIG.baseUrl}/api/registro-ponto`, registro);
  }

  consultarUltimoPonto(): Observable<boolean> {
    return this.http.get<boolean>(`${API_CONFIG.baseUrl}/api/registro-ponto/is-entrada`);
  }

  findAll(): Observable<RegistroPonto[]> {
    return this.http.get<RegistroPonto[]>(`${API_CONFIG.baseUrl}/api/registro-ponto/registros`);
  }

  findById(id: any): Observable<RegistroPonto> {
    return this.http.get<RegistroPonto>(`${API_CONFIG.baseUrl}/api/registro-ponto/${id}`);
  }
}
