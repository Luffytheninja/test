import { IncomeEntry, ExpenseEntry, UserCategory } from './types';

const STORAGE_KEYS = {
  USER_DATA: 'taxed_user_data',
  INCOME_ENTRIES: 'taxed_income_entries',
  EXPENSE_ENTRIES: 'taxed_expense_entries',
  USER_CATEGORY: 'taxed_user_category',
};

export interface UserData {
  monthlyIncome: number;
  lifePremium: number;
  healthPremium: number;
  nhiaVoluntary: number;
  rentPaid: number;
  utilityPercentage: number;
  monthlyUtilities: number;
  employeeCount: number;
  voluntaryPension: number;
  mortgageInterest: number;
}

export const saveUserData = (data: UserData) => {
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data));
};

export const loadUserData = (): UserData | null => {
  const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  return data ? JSON.parse(data) : null;
};

export const saveIncomeEntries = (entries: IncomeEntry[]) => {
  localStorage.setItem(STORAGE_KEYS.INCOME_ENTRIES, JSON.stringify(entries));
};

export const loadIncomeEntries = (): IncomeEntry[] => {
  const data = localStorage.getItem(STORAGE_KEYS.INCOME_ENTRIES);
  return data ? JSON.parse(data) : [];
};

export const saveExpenseEntries = (entries: ExpenseEntry[]) => {
  localStorage.setItem(STORAGE_KEYS.EXPENSE_ENTRIES, JSON.stringify(entries));
};

export const loadExpenseEntries = (): ExpenseEntry[] => {
  const data = localStorage.getItem(STORAGE_KEYS.EXPENSE_ENTRIES);
  return data ? JSON.parse(data) : [];
};

export const saveUserCategory = (category: UserCategory) => {
  localStorage.setItem(STORAGE_KEYS.USER_CATEGORY, category);
};

export const loadUserCategory = (): UserCategory => {
  return (localStorage.getItem(STORAGE_KEYS.USER_CATEGORY) as UserCategory) || 'PAYE';
};
