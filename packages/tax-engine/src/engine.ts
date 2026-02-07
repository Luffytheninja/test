import { TAX_CONSTANTS } from './constants';
import { TaxInputs, TaxResults } from './types';

export function calculateTax(inputs: TaxInputs): TaxResults {
    const {
        monthlyIncome,
        lifePremium,
        healthPremium,
        nhiaVoluntary,
        rentPaid,
        utilityPercentage,
        monthlyUtilities,
        employeeCount,
        voluntaryPension,
        mortgageInterest,
        incomeEntries,
        expenseEntries,
    } = inputs;

    const category = inputs.category || 'PAYE';

    // Calculate actual income from entries
    const totalTrackedIncome = incomeEntries.reduce(
        (sum, entry) => {
            const amount = parseFloat(String(entry.amount || 0));
            const rate = entry.exchangeRate || 1;
            return sum + (amount * rate);
        },
        0
    );
    const totalTrackedExpenses = expenseEntries
        .filter((e) => e.deductible)
        .reduce((sum, entry) => {
            const amount = parseFloat(String(entry.amount || 0));
            const rate = entry.exchangeRate || 1;
            return sum + (amount * rate);
        }, 0);

    // Use tracked income if available, otherwise use manual input
    const annualGross = totalTrackedIncome > 0 ? totalTrackedIncome : monthlyIncome * 12;

    // Small Business Exemption Logic (₦50M or less)
    const isSmallBusinessExempt = category === 'SmallBusiness' && annualGross <= 50000000;

    // Tax-Free Zone Check (₦800,000 or less)
    const isTaxFree = annualGross <= 800000;

    const pension = annualGross * TAX_CONSTANTS.PENSION_RATE;
    const nhf = annualGross * TAX_CONSTANTS.NHF_RATE;
    const maxLifeRelief = annualGross * TAX_CONSTANTS.MAX_LIFE_RELIEF_PERCENTAGE;
    const lifeInsuranceRelief = Math.min(lifePremium, maxLifeRelief);
    const lifeInsuranceUnused = maxLifeRelief - lifeInsuranceRelief;
    const rentRelief = Math.min(rentPaid * TAX_CONSTANTS.RENT_RELIEF_PERCENTAGE, TAX_CONSTANTS.MAX_RENT_RELIEF_CAP);

    // Include tracked expenses in deductions
    const annualUtilities = monthlyUtilities * 12;
    const businessUtilities = annualUtilities * (utilityPercentage / 100);
    const totalBusinessExpenses = totalTrackedExpenses + businessUtilities;

    const totalDeductions =
        pension + nhf + lifeInsuranceRelief + rentRelief + totalBusinessExpenses + voluntaryPension + mortgageInterest;
    const netIncome = Math.max(0, annualGross - totalDeductions);
    const taxFreeAllowance = TAX_CONSTANTS.TAX_FREE_ALLOWANCE;
    const chargeableIncome = isSmallBusinessExempt ? 0 : Math.max(0, netIncome - taxFreeAllowance);

    // 2025 Nigerian Tax Act (NTA) Progressive Bands
    // Base is first 800k @ 0% (handled by chargeableIncome deduction)
    const TAX_BANDS_CONFIG = [
        { threshold: 2200000, rate: 0.15 },  // Next 2.2M (Up to 3M total)
        { threshold: 11200000, rate: 0.18 }, // Next 9M (Up to 12M total)
        { threshold: 24200000, rate: 0.21 }, // Next 13M (Up to 25M total)
        { threshold: 49200000, rate: 0.23 }, // Next 25M (Up to 50M total)
        { threshold: Infinity, rate: 0.25 }, // Above 50M total
    ];


    let remainingChargeable = chargeableIncome;
    let prevThreshold = 0;
    const taxBands = [];
    let annualTax = 0;

    for (const band of TAX_BANDS_CONFIG) {
        const bandSize = band.threshold - prevThreshold;
        const taxableInBand = Math.min(remainingChargeable, bandSize);
        const taxInBand = taxableInBand * band.rate;

        taxBands.push({
            rate: band.rate * 100,
            threshold: band.threshold,
            taxableInBand,
            taxInBand,
        });

        annualTax += taxInBand;
        remainingChargeable -= taxableInBand;
        prevThreshold = band.threshold;
        if (remainingChargeable <= 0) break;
    }

    const monthlyTax = annualTax / 12;
    const monthlyTakeHome = annualGross / 12 - monthlyTax;
    const annualTakeHome = monthlyTakeHome * 12;
    const potentialAdditionalLife = lifeInsuranceUnused;
    const potentialTaxSavings = potentialAdditionalLife * 0.15; // Conservative estimate
    const nhiaMandatory = employeeCount >= 3;
    const effectiveRate = annualGross > 0 ? (annualTax / annualGross) * 100 : 0;

    return {
        annualGross,
        pension,
        nhf,
        lifeInsuranceRelief,
        lifeInsuranceUnused,
        maxLifeRelief,
        rentRelief,
        businessUtilities,
        totalBusinessExpenses,
        totalDeductions,
        netIncome,
        taxFreeAllowance,
        chargeableIncome,
        annualTax,
        monthlyTax,
        monthlyTakeHome,
        annualTakeHome,
        potentialAdditionalLife,
        potentialTaxSavings,
        nhiaMandatory,
        healthPremium,
        nhiaVoluntary,
        voluntaryPension,
        mortgageInterest,
        totalTrackedIncome,
        totalTrackedExpenses,
        category,
        isTaxFree,
        taxBands,
        effectiveRate,
    };
}

export function getQuarterlyPayments(annualTax: number) {
    const quarterlyTax = annualTax / TAX_CONSTANTS.QUARTERLY_PAYMENT_COUNT;
    const currentYear = new Date().getFullYear();

    return [
        { quarter: `Q1 (Jan-Mar)`, amount: quarterlyTax, dueDate: `April 30, ${currentYear}`, status: 'Due' },
        { quarter: `Q2 (Apr-Jun)`, amount: quarterlyTax, dueDate: `July 31, ${currentYear}`, status: 'Upcoming' },
        { quarter: `Q3 (Jul-Sep)`, amount: quarterlyTax, dueDate: `October 31, ${currentYear}`, status: 'Upcoming' },
        { quarter: `Q4 (Oct-Dec)`, amount: quarterlyTax, dueDate: `January 31, ${currentYear + 1}`, status: 'Upcoming' }
    ];
}

export function getMultiYearProjection(results: TaxResults, lifePremium: number) {
    const years = [];
    const growthRate = TAX_CONSTANTS.PROJECTED_GROWTH_RATE;
    const currentYear = new Date().getFullYear();

    for (let i = 0; i < 5; i++) {
        const yearIncome = results.annualGross * Math.pow(1 + growthRate, i);
        const yearPension = yearIncome * TAX_CONSTANTS.PENSION_RATE;
        const yearNhf = yearIncome * TAX_CONSTANTS.NHF_RATE;
        const yearMaxLife = yearIncome * TAX_CONSTANTS.MAX_LIFE_RELIEF_PERCENTAGE;
        const yearLifeRelief = Math.min(lifePremium, yearMaxLife);
        const yearDeductions = yearPension + yearNhf + yearLifeRelief + results.rentRelief + results.totalBusinessExpenses;
        const yearNet = yearIncome - yearDeductions;
        const yearChargeable = Math.max(0, yearNet - TAX_CONSTANTS.TAX_FREE_ALLOWANCE);
        const yearTax = yearChargeable * TAX_CONSTANTS.ANNUAL_TAX_RATE;
        const yearTakeHome = yearIncome - yearTax;

        years.push({
            year: currentYear + i,
            income: yearIncome,
            tax: yearTax,
            takeHome: yearTakeHome,
            effectiveRate: ((yearTax / yearIncome) * 100).toFixed(1)
        });
    }

    return years;
}
