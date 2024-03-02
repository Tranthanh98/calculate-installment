const { calculateInstallment, InstallmentType } = require("../src");

console.log(calculateInstallment(500000000, 60, 7, InstallmentType.PIDE));
