import { calculateTax, getTaxRates } from './calculator';
import { currentTaxSlabResident } from './tax-slab';
import { IncomeYear, ResidentType } from './types';

describe('calculateTax', () => {
  it('should calculate tax correctly for a given year, income, and resident type', () => {
    // Use the mock getTaxRates function in the test case
    let tax = calculateTax(
      IncomeYear.Year_2021_2022,
      96000,
      ResidentType.Residents,
    );

    // Verify the expected tax amount based on the given tax slabs and income
    expect(tax).toBe(21667); // Expected tax amount: (96000 - 51000) * 0.325 + 5092 = 21667

    tax = calculateTax(
      IncomeYear.Year_2021_2022,
      185000,
      ResidentType.Residents,
    );

    // Verify the expected tax amount based on the given tax slabs and income
    expect(tax).toBe(53917);
  });

  it('should throw an error if tax rates are not found for the given year and resident type', () => {
    // Ensure that the function throws an error with the appropriate message
    expect(() =>
      calculateTax(IncomeYear.Year_2023_2024, 50000, ResidentType.Children),
    ).toThrowError('Tax rates not found for Children in 2023-24');
  });

  it('should throw an error if tax slab is not found for the given income', () => {
    // Ensure that the function throws an error with the appropriate message
    expect(() =>
      calculateTax(IncomeYear.Year_2023_2024, -30000, ResidentType.Residents),
    ).toThrowError('Tax slab not found for -30000');
    // expect(getTaxRates).toHaveBeenCalledWith('2023', 'Resident');
  });
});

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
});
