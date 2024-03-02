const InstallmentType = {
  ODGD: 0, //Outstanding debt gradually decreases
  PIDE: 1, //Principal and interest divided equally
};

const Rounding = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
};

function calculateInstallment(
  loanAmount,
  months,
  rate,
  installmentType = InstallmentType.ODGD,
  rounding = Rounding.ZERO
) {
  let totalLoanAndInterest = loanAmount;
  const copiedLoanAmount = loanAmount;

  let totalInterest = 0;
  const details = [];

  const payPerMonth = Math.round((loanAmount / months).toFixed(rounding));
  const avgRate = Number((rate / 12).toFixed(4));

  let countMonth = 1;
  while (countMonth <= months) {
    const interest = Math.round(
      ((avgRate * loanAmount) / 100).toFixed(rounding)
    );

    totalInterest += interest;

    const remaining = Math.round((loanAmount - payPerMonth).toFixed(2));
    details.push({
      loanBeginingPeriod: loanAmount,
      originLoanPaid: payPerMonth,
      interest,
      totalPaid: Math.round((payPerMonth + interest).toFixed(rounding)),
      loanEndingPeriod: remaining > 0 ? remaining : 0,
      month: countMonth,
    });

    loanAmount -= payPerMonth;
    countMonth++;
  }

  totalLoanAndInterest += totalInterest;

  if (installmentType === InstallmentType.PIDE) {
    const avg = Math.round((totalLoanAndInterest / months).toFixed(rounding));

    let tempLoanBeginingPeriod = copiedLoanAmount;

    for (let item of details) {
      let tempOriginPaid = Math.round((avg - item.interest).toFixed(rounding));

      item.originLoanPaid =
        tempLoanBeginingPeriod < tempOriginPaid
          ? tempLoanBeginingPeriod
          : tempOriginPaid;

      item.loanBeginingPeriod = tempLoanBeginingPeriod;
      item.loanEndingPeriod =
        tempLoanBeginingPeriod - item.originLoanPaid > 0
          ? tempLoanBeginingPeriod - item.originLoanPaid
          : 0;

      item.totalPaid = item.originLoanPaid + item.interest;

      tempLoanBeginingPeriod = item.loanEndingPeriod;
    }
  }

  return {
    loanAmount: copiedLoanAmount,
    totalLoanAndInterest,
    totalInterest,
    details,
  };
}

exports.InstallmentType = InstallmentType;
exports.Rounding = Rounding;
exports.calculateInstallment = calculateInstallment;
