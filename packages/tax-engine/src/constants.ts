export const TAX_CONSTANTS = {
    PENSION_RATE: 0.08,
    NHF_RATE: 0.025,
    MAX_LIFE_RELIEF_PERCENTAGE: 0.20,
    MAX_RENT_RELIEF_CAP: 500000,
    RENT_RELIEF_PERCENTAGE: 0.20,
    TAX_FREE_ALLOWANCE: 800000,
    ANNUAL_TAX_RATE: 0.15,
    QUARTERLY_PAYMENT_COUNT: 4,
    PROJECTED_GROWTH_RATE: 0.10,
};

export const INITIAL_VALUES = {
    MONTHLY_INCOME: 200000,
    UTILITY_PERCENTAGE: 40,
    MONTHLY_UTILITIES: 20000,
};

export const NIGERIAN_INSURERS = [
    { name: 'AXA Mansard', type: 'Life & Health', api: 'https://api.axamansard.com', status: 'Available' },
    { name: 'Custodian Investment', type: 'Life Insurance', api: 'https://api.custodianplc.com', status: 'Available' },
    { name: 'Leadway Assurance', type: 'Life & Health', api: 'https://api.leadway.com', status: 'Integration Ready' },
    { name: 'AIICO Insurance', type: 'Life Insurance', api: 'https://api.aiicoplc.com', status: 'Available' },
    { name: 'Hygeia HMO', type: 'Health Insurance', api: 'https://api.hygeiahmo.com', status: 'Available' },
    { name: 'Reliance HMO', type: 'Health Insurance', api: 'https://api.reliancehmo.com', status: 'Available' }
];
