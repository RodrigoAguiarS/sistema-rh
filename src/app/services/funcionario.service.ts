import { TipoDesconto } from './../models/tipoDesconto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Funcionario } from '../models/funcionario';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Demissao } from '../models/demissao';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${API_CONFIG.baseUrl}/api/funcionarios`);
  }

  findAllFuncinarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${API_CONFIG.baseUrl}/api/funcionarios/detalhes`);
  }

  findById(id: any): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${API_CONFIG.baseUrl}/api/funcionarios/${id}`);
  }

  demitirFuncionario(id: any, demissao: Demissao): Observable<Demissao> {
    return this.http.post<any>(`${API_CONFIG.baseUrl}/api/funcionarios/demitir/${id}`, demissao);
  }

  adicionarTiposDesconto(id: any, tiposDesconto: TipoDesconto[]): Observable<TipoDesconto> {
    return this.http.post<TipoDesconto>(`${API_CONFIG.baseUrl}/api/funcionarios/${id}/atribuir-tipos-desconto`, tiposDesconto);
  }
}
