export type ProductType = 'CDB' | 'LCI' | 'LCA';
export type RiskTier = 'BAIXO' | 'MEDIO' | 'ALTO';

export interface SimulationModel {
    id?: number | string;
    createdAt: string;
    clientId: string;
    productType: ProductType;
    termMonths: number;
    initial: number
    income: number;
    total: number;
    risk: RiskTier;
    profitability: number;
    notes: string | null
}