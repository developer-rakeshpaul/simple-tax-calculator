"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaxRates = exports.calculateTax = void 0;
var ramda_1 = require("ramda");
var tax_slab_1 = require("./tax-slab");
var error_1 = require("./error");
function calculateTax(year, income, type) {
    var taxSlabs = getTaxRates(year, type);
    if (taxSlabs === undefined) {
        throw new error_1.RateNotFoundError("Tax rates not found for ".concat(type, " in ").concat(year));
    }
    var tax = 0;
    var taxSlab = (0, ramda_1.find)(function (slab) { return income >= slab.lowerLimit && income <= slab.upperLimit; }, taxSlabs);
    if (taxSlab === undefined) {
        throw new error_1.SlabNotFoundError("Tax slab not found for ".concat(income));
    }
    var taxableIncome = income - taxSlab.thresholdIncome;
    tax = taxableIncome * taxSlab.rate + taxSlab.baseTax;
    return tax;
}
exports.calculateTax = calculateTax;
function getTaxRates(year, type) {
    var _a;
    return (_a = tax_slab_1.taxRates[type]) === null || _a === void 0 ? void 0 : _a[year];
}
exports.getTaxRates = getTaxRates;
