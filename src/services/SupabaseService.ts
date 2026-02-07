import { supabase } from '../lib/supabase';
import { TaxInputs, TaxResults } from '@antigravity/tax-engine';

export const syncTaxData = async (
    userId: string | null,
    inputs: TaxInputs,
    results: TaxResults,
    category: string
) => {
    // 1. Save User Profile / Metadata
    const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
            id: userId || undefined, // If null, Supabase might handle it or we skip
            category: category,
            last_updated: new Date().toISOString(),
            metadata: {
                rent_paid: inputs.rentPaid,
                life_premium: inputs.lifePremium,
                health_premium: inputs.healthPremium,
            }
        }, { onConflict: 'id' });

    if (profileError) console.error('Error syncing profile:', profileError);

    // 2. Log a Snapshot of the calculation (for data collection/history)
    const { error: snapshotError } = await supabase
        .from('tax_snapshots')
        .insert({
            user_id: userId,
            gross_income: results.annualGross,
            chargeable_income: results.chargeableIncome,
            annual_tax: results.annualTax,
            net_income: results.netIncome,
            tax_year: 2025,
            raw_inputs: inputs
        });

    if (snapshotError) console.error('Error saving snapshot:', snapshotError);
};
