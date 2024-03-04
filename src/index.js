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

  const avgRate = rate / 100 / 12;
  const avgPaidPerMonth =
    (copiedLoanAmount * avgRate * Math.pow(1 + avgRate, months)) /
    (Math.pow(1 + avgRate, months) - 1);

  const payPerMonth = Math.round((loanAmount / months).toFixed(rounding));

  let countMonth = 1;
  while (countMonth <= months) {
    const interest = Math.round((avgRate * loanAmount).toFixed(rounding));

    const remaining = Math.round((loanAmount - payPerMonth).toFixed(rounding));

    const originLoanPaid = Math.round(
      (avgPaidPerMonth - interest).toFixed(rounding)
    );

    let detail = {
      loanBeginingPeriod: loanAmount,
      interest,
      month: countMonth,
    };

    if (installmentType === InstallmentType.ODGD) {
      detail = {
        ...detail,
        originLoanPaid: payPerMonth,
        totalPaid: Math.round((payPerMonth + interest).toFixed(rounding)),
        loanEndingPeriod: remaining > 0 ? remaining : 0,
      };
    } else {
      detail = {
        ...detail,
        originLoanPaid,
        totalPaid: Math.round(avgPaidPerMonth.toFixed(rounding)),
        loanEndingPeriod: loanAmount - originLoanPaid,
      };
    }

    details.push(detail);

    totalInterest += interest;
    loanAmount -= detail.originLoanPaid;
    countMonth++;
  }

  totalLoanAndInterest += totalInterest;

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
