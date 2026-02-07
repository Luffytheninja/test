import {
  UserCategory,
  IncomeEntry,
  ExpenseEntry,
  TaxBand,
  TaxResults as EngineTaxResults
} from '@antigravity/tax-engine';

export type { UserCategory, IncomeEntry, ExpenseEntry, TaxBand };
export type TaxResults = EngineTaxResults;

export interface EmailReminder {
  id: number;
  quarter: string;
  dueDate: string;
  amount: number;
  email: string;
  status: string;
}

export interface InsuranceProvider {
  id: string;
  name: string;
  type: 'Life Insurance' | 'Health Insurance' | 'Life & Health';
  api: string;
  status: 'Available' | 'Integration Ready' | 'Maintenance';
  isConnected: boolean;
  syncedPolicyNumber?: string;
  syncedPremium?: number;
  lastSync?: string;
}
