export const formatCurrency = (amount: number | string) => {
  const value = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(isNaN(value) ? 0 : value);
};

// live API fetch for CBN exchange rate
export const fetchExchangeRates = async (base: string = 'USD') => {
  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
    const data = await response.json();
    return data.rates['NGN'] || 1600; // Fallback to a realistic 2026 NGN rate if API fails
  } catch (error) {
    console.error('Exchange rate fetch failed', error);
    return 1600;
  }
};

export const COLORS = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
