import { find } from 'ramda';
import { taxRates } from './tax-slab';
import { IncomeYear, ResidentType, TaxRateSlab } from './types';
import { RateNotFoundError, SlabNotFoundError } from './error';

export function calculateTax(
  year: IncomeYear,
  income: number,
  type: ResidentType,
): number {
  const taxSlabs = getTaxRates(year, type);
  if (taxSlabs === undefined) {
    throw new RateNotFoundError(`Tax rates not found for ${type} in ${year}`);
  }

  let tax = 0;
  const taxSlab = find(
    (slab) => income >= slab.lowerLimit && income <= slab.upperLimit,
    taxSlabs,
  );
  if (taxSlab === undefined) {
    throw new SlabNotFoundError(`Tax slab not found for ${income}`);
  }

  const taxableIncome = income - taxSlab.thresholdIncome;
  tax = taxableIncome * taxSlab.rate + taxSlab.baseTax;
  return tax;
}

export function getTaxRates(
  year: IncomeYear,
  type: ResidentType,
): TaxRateSlab[] | undefined {
  return taxRates[type]?.[year];
}
