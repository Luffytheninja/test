import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
    calculateTax,
    TaxInputs,
    TaxResults,
    IncomeEntry,
    ExpenseEntry,
    INITIAL_VALUES
} from '@antigravity/tax-engine';
import {
    loadUserData,
    saveUserData,
    loadIncomeEntries,
    saveIncomeEntries,
    loadExpenseEntries,
    saveExpenseEntries,
    loadUserCategory,
    saveUserCategory
} from '../persistence';

interface TaxContextType {
    inputs: TaxInputs;
    results: TaxResults | null;
    userCategory: string;
    updateInputs: (updates: Partial<TaxInputs>) => void;
    updateUserCategory: (category: string) => void;
    addIncome: (entry: IncomeEntry) => void;
    deleteIncome: (id: number) => void;
    addExpense: (entry: ExpenseEntry) => void;
    deleteExpense: (id: number) => void;
}

const TaxContext = createContext<TaxContextType | undefined>(undefined);

export const TaxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [inputs, setInputs] = useState<TaxInputs>({
        monthlyIncome: INITIAL_VALUES.MONTHLY_INCOME,
        lifePremium: 0,
        healthPremium: 0,
        nhiaVoluntary: 0,
        rentPaid: 0,
        utilityPercentage: INITIAL_VALUES.UTILITY_PERCENTAGE,
        monthlyUtilities: INITIAL_VALUES.MONTHLY_UTILITIES,
        employeeCount: 0,
        voluntaryPension: 0,
        mortgageInterest: 0,
        incomeEntries: [],
        expenseEntries: [],
    });

    const [userCategory, setUserCategory] = useState('PAYE');

    // Initial load
    useEffect(() => {
        const data = loadUserData();
        if (data) {
            setInputs((prev: TaxInputs) => ({
                ...prev,
                ...data,
                incomeEntries: loadIncomeEntries(),
                expenseEntries: loadExpenseEntries(),
            }));
        }
        setUserCategory(loadUserCategory());
    }, []);

    // Save on change
    useEffect(() => {
        saveUserData(inputs);
        saveIncomeEntries(inputs.incomeEntries);
        saveExpenseEntries(inputs.expenseEntries);
        saveUserCategory(userCategory as any);
    }, [inputs, userCategory]);

    const results = useMemo(() => calculateTax({ ...inputs, category: userCategory as any }), [inputs, userCategory]);

    const updateInputs = (updates: Partial<TaxInputs>) => {
        setInputs((prev: TaxInputs) => ({ ...prev, ...updates }));
    };

    const updateUserCategory = (category: string) => {
        setUserCategory(category);
    };

    const addIncome = (entry: IncomeEntry) => {
        setInputs((prev: TaxInputs) => ({
            ...prev,
            incomeEntries: [...prev.incomeEntries, entry]
        }));
    };

    const deleteIncome = (id: number) => {
        setInputs((prev: TaxInputs) => ({
            ...prev,
            incomeEntries: prev.incomeEntries.filter((e: IncomeEntry) => e.id !== id)
        }));
    };

    const addExpense = (entry: ExpenseEntry) => {
        setInputs((prev: TaxInputs) => ({
            ...prev,
            expenseEntries: [...prev.expenseEntries, entry]
        }));
    };

    const deleteExpense = (id: number) => {
        setInputs((prev: TaxInputs) => ({
            ...prev,
            expenseEntries: prev.expenseEntries.filter((e: ExpenseEntry) => e.id !== id)
        }));
    };

    return (
        <TaxContext.Provider value={{
            inputs,
            results,
            userCategory,
            updateInputs,
            updateUserCategory,
            addIncome,
            deleteIncome,
            addExpense,
            deleteExpense
        }}>
            {children}
        </TaxContext.Provider>
    );
};

export const useTax = () => {
    const context = useContext(TaxContext);
    if (context === undefined) {
        throw new Error('useTax must be used within a TaxProvider');
    }
    return context;
};
