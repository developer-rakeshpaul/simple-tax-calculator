"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaxSlabTableRows = exports.getTableRowsForTaxSlab = exports.convertSlabToTableRows = exports.taxRates = exports.currentWorkingHolidayTaxSlab = exports.currentTaxSlabForeignResident = exports.currentTaxSlabResident = void 0;
var ramda_1 = require("ramda");
var types_1 = require("./types");
// https://www.ato.gov.au/Rates/Individual-income-tax-for-prior-years/
exports.currentTaxSlabResident = [
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
exports.currentTaxSlabForeignResident = [
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
exports.currentWorkingHolidayTaxSlab = [
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
exports.taxRates = (_a = {},
    _a[types_1.ResidentType.Residents] = (_b = {},
        _b[types_1.IncomeYear.Year_2023_2024] = exports.currentTaxSlabResident,
        _b[types_1.IncomeYear.Year_2022_2023] = exports.currentTaxSlabResident,
        _b[types_1.IncomeYear.Year_2021_2022] = exports.currentTaxSlabResident,
        _b[types_1.IncomeYear.Year_2020_2021] = exports.currentTaxSlabResident,
        _b),
    _a[types_1.ResidentType.Foreign_Residents] = (_c = {},
        _c[types_1.IncomeYear.Year_2023_2024] = exports.currentTaxSlabForeignResident,
        _c[types_1.IncomeYear.Year_2022_2023] = exports.currentTaxSlabForeignResident,
        _c[types_1.IncomeYear.Year_2021_2022] = exports.currentTaxSlabForeignResident,
        _c[types_1.IncomeYear.Year_2020_2021] = exports.currentTaxSlabForeignResident,
        _c),
    _a);
function convertSlabToTableRows(slab) {
    var taxOnIncome = slab.baseTax > 0 || slab.rate > 0 ? '' : 'Nil';
    if (slab.baseTax > 0) {
        taxOnIncome = "$".concat(new Intl.NumberFormat().format(slab.baseTax), " plus ");
    }
    if (slab.rate > 0) {
        taxOnIncome += "".concat(slab.rate, "c for each $1 over $").concat(new Intl.NumberFormat().format(slab.thresholdIncome));
    }
    var taxableIncome = "$".concat(new Intl.NumberFormat().format(slab.lowerLimit));
    if (slab.upperLimit == Infinity) {
        taxableIncome += " and over";
    }
    else {
        taxableIncome += " - $".concat(new Intl.NumberFormat().format(slab.upperLimit));
    }
    return [taxableIncome, taxOnIncome];
}
exports.convertSlabToTableRows = convertSlabToTableRows;
function getTableRowsForTaxSlab(taxSlab) {
    if (!taxSlab) {
        return [];
    }
    return (0, ramda_1.map)(convertSlabToTableRows, taxSlab);
}
exports.getTableRowsForTaxSlab = getTableRowsForTaxSlab;
function getTaxSlabTableRows(residentType, incomeYear) {
    var _a;
    var taxSlab = (_a = exports.taxRates[residentType]) === null || _a === void 0 ? void 0 : _a[incomeYear];
    return getTableRowsForTaxSlab(taxSlab);
}
exports.getTaxSlabTableRows = getTaxSlabTableRows;
