import { getTaxRates } from '../src/calculator';
import {
  currentTaxSlabResident,
  getTableRowsForTaxSlab,
  taxRates,
} from '../src/tax-slab';
import { IncomeYear, ResidentType } from '../src/types';

describe('getTaxRates', () => {
  it('should return tax rates for a given year and resident type', () => {
    const taxSlabs = getTaxRates(
      IncomeYear.Year_2021_2022,
      ResidentType.Residents,
    );
    expect(taxSlabs).toEqual(currentTaxSlabResident);
  });

  it('should return undefined if tax rates are not found for the given year and resident type', () => {
    const taxSlabs = getTaxRates(
      IncomeYear.Year_2023_2024,
      ResidentType.Children,
    );
    expect(taxSlabs).toBeUndefined();
  });

  it('should return an empty array if tax slab is undefined', () => {
    const taxSlab = undefined;
    const tableRows = getTableRowsForTaxSlab(taxSlab);
    expect(tableRows).toEqual([]);
  });

  it('should return an array of table rows for a given tax slab', () => {
    const tableRows = getTableRowsForTaxSlab(
      taxRates[ResidentType.Residents]?.[IncomeYear.Year_2021_2022],
    );
    const expectedTableRows = [
      ['$0 - $18,200', 'Nil'],
      ['$18,201 - $45,000', '0.19c for each $1 over $18,200'],
      ['$45,001 - $120,000', '$5,092 plus 0.325c for each $1 over $45,000'],
      ['$120,001 - $180,000', '$29,467 plus 0.37c for each $1 over $120,000'],
      ['$180,001 and over', '$51,667 plus 0.45c for each $1 over $180,000'],
    ];
    expect(tableRows).toEqual(expectedTableRows);
  });
});
