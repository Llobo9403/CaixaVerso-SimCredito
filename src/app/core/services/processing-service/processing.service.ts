import { Injectable } from '@angular/core';
import { ProductType, RiskTier, SimulationModel } from '../../models/simulation.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessingService {
  apiUrl: string = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  annualToMonthlyRate(annualRateDecimal: number): number {
    return Math.pow(1 + annualRateDecimal, 1 / 12) - 1;
  }

  round2(n: number): number {
    return Math.round(n * 100) / 100;
  }

  getInvestmentProduct(productType: ProductType): { profitability: number; risk: RiskTier } {
    switch (productType) {
      case 'CDB':
        return { profitability: 110, risk: 'BAIXO' };
      case 'LCI':
        return { profitability: 95, risk: 'BAIXO' };
      case 'LCA':
        return { profitability: 98, risk: 'BAIXO' };
    }
  }
  simulateInvestment(params: {
    clientId: string;
    productType: ProductType;
    termMonths: number;
    principal: number; 
    profitPercent?: number;
  }): Observable<SimulationModel> {

    const {
      clientId,
      productType,
      termMonths,
      principal,
      profitPercent = 13.15,
    } = params;
    const product = this.getInvestmentProduct(productType);
    const profitability = profitPercent / 100;
    const annualRateDecimal = profitability * (product.profitability / 100);
    const monthlyRateDecimal = this.annualToMonthlyRate(annualRateDecimal);
    const total = principal * Math.pow(1 + monthlyRateDecimal, termMonths);
    const initial = principal
    const income = total - principal;
    const payload = {
      id: crypto?.randomUUID?.() ?? `${Date.now()}`,
      createdAt: new Date().toISOString(),
      clientId,
      productType,
      termMonths,
      initial,
      income: this.round2(income),
      total: this.round2(total),
      risk: product.risk,
      profitability: this.round2(annualRateDecimal * 100),
      notes: null
    };

    return this.http.post<SimulationModel>(`${this.apiUrl}/history`, payload);
  }
}
