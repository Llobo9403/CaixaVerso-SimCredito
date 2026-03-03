import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  apiUrl: string = "http://localhost:3000"

  constructor(private http : HttpClient) { }

  getAccountDetails(): Observable<Account>{
    return this.http.get<Account>(`${this.apiUrl}/account`)
  }
}
