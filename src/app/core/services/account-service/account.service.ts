import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../../models/account.model';
import { Observable } from 'rxjs';
import { SelectOptionsModel } from '../../models/products.model';
import { SimulationModel } from '../../models/simulation.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  apiUrl: string = "http://localhost:3000"

  constructor(private http : HttpClient) { }

  getAccountDetails(id : number): Observable<Account>{
    return this.http.get<Account>(`${this.apiUrl}/account?accountId=${id}`)
  }

  getProducts(): Observable<SelectOptionsModel[]>{
    return this.http.get<SelectOptionsModel[]>(`${this.apiUrl}/products`)
  }

  getHistory(): Observable<SimulationModel[]>{
    return this.http.get<SimulationModel[]>(`${this.apiUrl}/history`)
  }

  addNote(id: any, notes: string) {
    return this.http.patch(`${this.apiUrl}/history/${id}`, { notes: notes });
  }

  deleteHistory(id: any){
    return this.http.delete(`${this.apiUrl}/history/${id}`)
  }

  mapHttpError(err: any): string {
    if (err?.status === 0) return 'Serviço indisponível';
    if (err?.status === 400) return 'Dados inválidos';
    if (err?.status === 403) return 'Ação não autorizada';
    if (err?.status === 404) return 'Pãgina não encontrada';
    if (err?.status === 422) return 'Nenhum produto compatível para os parâmetros informados';
    if (err?.status >= 500) return 'Serviço indisponível';
    
    return 'Erro inesperado';
  }
}
