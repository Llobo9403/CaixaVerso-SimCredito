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
}
