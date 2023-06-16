import Table from 'cli-table';
import { prompt } from 'enquirer';
import { calculateTax, getTaxRates } from './calculator';
import { getTableRowsForTaxSlab } from './tax-slab';
import { IncomeYear, ResidentType } from './types';

async function calculate() {
  try {
    const response: {
      incomeYear: IncomeYear;
      income: number;
      residentType: ResidentType;
    } = await prompt([
      {
        type: 'select',
        name: 'incomeYear',
        message: 'Select an income year',
        choices: Object.values(IncomeYear),
      },
      {
        type: 'input',
        name: 'income',
        message: 'Enter your total taxable income for the full income year',
        validate: (input: string) => {
          const income = Number(input);
          if (!income || isNaN(income)) {
            return 'Please enter a valid number';
          }
          if (income < 0) {
            return 'Income must be greater than 0';
          }
          return true;
        },
      },
      {
        type: 'select',
        name: 'residentType',
        message: 'Select your residency status',
        choices: Object.values(ResidentType),
      },
    ]);

    const { incomeYear, income, residentType } = response;
    const taxSlab = getTaxRates(incomeYear, residentType);

    // instantiate
    const table = new Table<[string, string]>({
      head: ['Taxable income', 'Tax on this income'],
      colWidths: [30, 60],
    });

    table.push(...getTableRowsForTaxSlab(taxSlab));
    console.log(table.toString());

    const tax = calculateTax(incomeYear, income, residentType);
    console.log(`Total tax: $${new Intl.NumberFormat().format(tax)}`);

    const respone: { repeat: boolean } = await prompt({
      type: 'confirm',
      name: 'repeat',
      message: 'Want to continue?',
    });
    if (respone.repeat) {
      calculate();
    } else {
      process.exit(0);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

calculate();
