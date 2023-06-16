"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cli_table_1 = __importDefault(require("cli-table"));
var enquirer_1 = require("enquirer");
var calculator_1 = require("./calculator");
var tax_slab_1 = require("./tax-slab");
var types_1 = require("./types");
function calculate() {
    return __awaiter(this, void 0, void 0, function () {
        var response, incomeYear, income, residentType, taxSlab, table, tax, respone, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, enquirer_1.prompt)([
                            {
                                type: 'select',
                                name: 'incomeYear',
                                message: 'Select an income year',
                                choices: Object.values(types_1.IncomeYear),
                            },
                            {
                                type: 'input',
                                name: 'income',
                                message: 'Enter your total taxable income for the full income year',
                                validate: function (input) {
                                    var income = Number(input);
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
                                choices: Object.values(types_1.ResidentType),
                            },
                        ])];
                case 1:
                    response = _a.sent();
                    incomeYear = response.incomeYear, income = response.income, residentType = response.residentType;
                    taxSlab = (0, calculator_1.getTaxRates)(incomeYear, residentType);
                    table = new cli_table_1.default({
                        head: ['Taxable income', 'Tax on this income'],
                        colWidths: [30, 60],
                    });
                    table.push.apply(table, (0, tax_slab_1.getTableRowsForTaxSlab)(taxSlab));
                    console.log(table.toString());
                    tax = (0, calculator_1.calculateTax)(incomeYear, income, residentType);
                    console.log("Total tax: $".concat(new Intl.NumberFormat().format(tax)));
                    return [4 /*yield*/, (0, enquirer_1.prompt)({
                            type: 'confirm',
                            name: 'repeat',
                            message: 'Want to continue?',
                        })];
                case 2:
                    respone = _a.sent();
                    if (respone.repeat) {
                        calculate();
                    }
                    else {
                        process.exit(0);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    process.exit(1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
calculate();
