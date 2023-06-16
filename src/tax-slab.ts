import { map } from 'ramda';
import { ResidentType, TaxRateSlab, TaxRates, IncomeYear } from './types';

// https://www.ato.gov.au/Rates/Individual-income-tax-for-prior-years/
export const currentTaxSlabResident: Array<TaxRateSlab> = [
  {
    lowerLimit: 0,
    upperLimit: 18200,
    rate: 0,
    baseTax: 0,
    thresholdIncome: 0,
  },
  {
    lowerLimit: 18201,
    upperLimit: 45000,
    rate: 0.19,
    baseTax: 0,
    thresholdIncome: 18200,
  },
  {
    lowerLimit: 45001,
    upperLimit: 120000,
    rate: 0.325,
    baseTax: 5092,
    thresholdIncome: 45000,
  },
  {
    lowerLimit: 120001,
    upperLimit: 180000,
    rate: 0.37,
    baseTax: 29467,
    thresholdIncome: 120000,
  },
  {
    lowerLimit: 180001,
    upperLimit: Infinity,
    rate: 0.45,
    baseTax: 51667,
    thresholdIncome: 180000,
  },
];

export const currentTaxSlabForeignResident: Array<TaxRateSlab> = [
  {
    lowerLimit: 0,
    upperLimit: 120000,
    rate: 0.325,
    baseTax: 0,
    thresholdIncome: 0,
  },
  {
    lowerLimit: 120001,
    upperLimit: 180000,
    rate: 0.37,
    baseTax: 39000,
    thresholdIncome: 120000,
  },
  {
    lowerLimit: 180001,
    upperLimit: Infinity,
    rate: 0.45,
    baseTax: 61200,
    thresholdIncome: 180000,
  },
];

export const currentWorkingHolidayTaxSlab: Array<TaxRateSlab> = [
  {
    lowerLimit: 0,
    upperLimit: 45000,
    rate: 0.15,
    baseTax: 0,
    thresholdIncome: 0,
  },
  {
    lowerLimit: 45001,
    upperLimit: 120000,
    rate: 0.325,
    baseTax: 6750,
    thresholdIncome: 45000,
  },
  {
    lowerLimit: 120001,
    upperLimit: 180000,
    rate: 0.37,
    baseTax: 31125,
    thresholdIncome: 120000,
  },
  {
    lowerLimit: 180001,
    upperLimit: Infinity,
    rate: 0.45,
    baseTax: 53325,
    thresholdIncome: 180000,
  },
];

export const taxRates: TaxRates = {
  [ResidentType.Residents]: {
    [IncomeYear.Year_2023_2024]: currentTaxSlabResident,
    [IncomeYear.Year_2022_2023]: currentTaxSlabResident,
    [IncomeYear.Year_2021_2022]: currentTaxSlabResident,
    [IncomeYear.Year_2020_2021]: currentTaxSlabResident,
  },
  [ResidentType.Foreign_Residents]: {
    [IncomeYear.Year_2023_2024]: currentTaxSlabForeignResident,
    [IncomeYear.Year_2022_2023]: currentTaxSlabForeignResident,
    [IncomeYear.Year_2021_2022]: currentTaxSlabForeignResident,
    [IncomeYear.Year_2020_2021]: currentTaxSlabForeignResident,
  },
};

export function convertSlabToTableRows(slab: TaxRateSlab): [string, string] {
  let taxOnIncome = slab.baseTax > 0 || slab.rate > 0 ? '' : 'Nil';
  if (slab.baseTax > 0) {
    taxOnIncome = `$${new Intl.NumberFormat().format(slab.baseTax)} plus `;
  }
  if (slab.rate > 0) {
    taxOnIncome += `${
      slab.rate
    }c for each $1 over $${new Intl.NumberFormat().format(
      slab.thresholdIncome,
    )}`;
  }

  let taxableIncome = `$${new Intl.NumberFormat().format(slab.lowerLimit)}`;
  if (slab.upperLimit == Infinity) {
    taxableIncome += ` and over`;
  } else {
    taxableIncome += ` - $${new Intl.NumberFormat().format(slab.upperLimit)}`;
  }
  return [taxableIncome, taxOnIncome];
}

export function getTableRowsForTaxSlab(
  taxSlab: TaxRateSlab[] | undefined,
): Array<[string, string]> {
  if (!taxSlab) {
    return [];
  }
  return map(convertSlabToTableRows, taxSlab);
}

export function getTaxSlabTableRows(
  residentType: ResidentType,
  incomeYear: IncomeYear,
): Array<[string, string]> {
  const taxSlab = taxRates[residentType]?.[incomeYear];
  return getTableRowsForTaxSlab(taxSlab);
}
