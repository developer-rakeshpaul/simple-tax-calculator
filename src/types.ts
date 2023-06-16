export enum IncomeYear {
  Year_2023_2024 = '2023-24',
  Year_2022_2023 = '2022-23',
  Year_2021_2022 = '2021-22',
  Year_2020_2021 = '2020-21',
}

export enum ResidentType {
  Residents = 'Residents',
  Foreign_Residents = 'Foreign Residents',
  Children = 'Children',
  Working_Holiday_Makers = 'Working Holiday Makers',
}

export interface TaxableIncome {
  lowerLimit: number;
  upperLimit: number;
}

export interface TaxRate {
  rate: number;
  baseTax: number;
  thresholdIncome: number;
}

export type TaxRateSlab = TaxableIncome & TaxRate;

export type TaxRates = {
  [K in ResidentType]?: {
    [Key in IncomeYear]: TaxRateSlab[];
  };
};
