import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { FolhaPagamento } from '../models/folhaPagamento';

@Injectable({
  providedIn: 'root'
})
export class FolhaDePagamentoService {
  baseUrl: any;

  constructor(private http: HttpClient) { }

  gerarRelatorio(idFuncionario: number): Observable<HttpResponse<Blob>> {
    const headers = new HttpHeaders().set('Accept', 'application/pdf');
    const params = new HttpParams().set('ID_FUNCIONARIO', idFuncionario.toString());
    
    return this.http.get<Blob>(`${API_CONFIG.baseUrl}/api/folhapagamentos/gerar-folha-pdf/`, {
      headers,
      params,
      responseType: 'blob' as 'json',
      observe: 'response'
    });
  }

  gerarFolhaPagamentoParaTodosFuncionarios(): Observable<FolhaPagamento[]> {
    return this.http.post<FolhaPagamento[]>(`${API_CONFIG.baseUrl}/api/folhapagamentos/gerar-todos`, {});
  }
}
