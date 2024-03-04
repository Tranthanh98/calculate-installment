const { calculateInstallment, InstallmentType } = require("../src");

console.log(calculateInstallment(100000000, 60, 10, InstallmentType.PIDE));
