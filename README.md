# Installment JS

a fast module to calculate loan/installment in js (browser/node.js) for **Outstanding debt gradually decreases** or **Principal and interest divided equally** installments, the sum of interest, detail of payment period, etc

## Getting Started

Install with:

```
npm install installment-js
```

#### Calculating Installment:

```js
  const { calculateInstallment } = require("installment-js");

  const result = calculateInstallment(
    500000000, //amount
    60, // total of months Installment
    7, // annual interest rate
    [installmentType?], //(optional) installment type InstallmentType.ODGE for Outstanding debt gradually decreases and InstallmentType.PIDE for Principal and interest divided equally
    [rounding?] // (optional) rounding for amount, you can pass the number or use the constant Rounding.ZERO, Rounding.ONE, Rounding.TWO,...
  );

/*
  returns
  {
    loanAmount: 500000000,
    totalLoanAndInterest: 588953250,
    totalInterest: 88953250,
    details: [
      {
        loanBeginingPeriod: 500000000,
        originLoanPaid: 6899388,
        interest: 2916500,
        totalPaid: 9815888,
        loanEndingPeriod: 493100612,
        month: 1
      },
      {
        loanBeginingPeriod: 493100612,
        originLoanPaid: 6947996,
        interest: 2867892,
        totalPaid: 9815888,
        loanEndingPeriod: 486152616,
        month: 2
      },
      ...
    ]
  }
*/

```

## Documentation

### Installment

calculateInstallment(amount, months, rate, [installmentType?], [rounding?])

### Arguments

| Argument        | type                   | default              | Description                               |
| --------------- | ---------------------- | -------------------- | ----------------------------------------- |
| amount          | number                 | \*required           | full amount of Loan                       |
| months          | number                 | \*required           | how many installments will be (in months) |
| rate            | number                 | \*required           | annual interest rate in percent (ex. 3.5) |
| installmentType | **InstallmentType**    | InstallmentType.ODGD | kind of Installment                       |
| rounding        | number or **Rounding** | Rounding.ZERO        | Rounding for the money                    |

### InstallmentType Constant

| Constant | Value | Description                            |
| -------- | ----- | -------------------------------------- |
| ODGD     | 0     | Outstanding debt gradually decreases   |
| PIDE     | 1     | Principal and interest divided equally |

- Outstanding debt gradually decreases(ODGD)
  ![image](https://github.com/Tranthanh98/calculate-installment/assets/51749033/ed86422f-f369-4ed6-8538-7dddbb43ffa3)

- Principal and interest divided equally (PIDE)
  ![image](https://github.com/Tranthanh98/calculate-installment/assets/51749033/52616282-b3a1-4606-b308-8a4428af65dc)

### Rounding Constant

| Constant | Value | Description                                        |
| -------- | ----- | -------------------------------------------------- |
| ZERO     | 0     | No Rounding                                        |
| ONE      | 1     | Round to 1 decimal places (**5.123** -> **5.1**)   |
| TWO      | 2     | Round to 2 decimal places (**5.123** -> **5.12**)  |
| THREE    | 3     | Round to 3 decimal places (**5.123** -> **5.123**) |

### Returns

```js
{
  loanAmount: 500000000,
  totalLoanAndInterest: 588953250,
  totalInterest: 88953250,
  details: [
    {
      loanBeginingPeriod: 500000000,
      originLoanPaid: 6899388,
      interest: 2916500,
      totalPaid: 9815888,
      loanEndingPeriod: 493100612,
      month: 1
    },
    {
      loanBeginingPeriod: 493100612,
      originLoanPaid: 6947996,
      interest: 2867892,
      totalPaid: 9815888,
      loanEndingPeriod: 486152616,
      month: 2
    },
    {
      loanBeginingPeriod: 486152616,
      originLoanPaid: 6996605,
      interest: 2819283,
      totalPaid: 9815888,
      loanEndingPeriod: 479156011,
      month: 3
    },
    ...
  ]
}
```

## Examples

```js
import {
  calculateInstallment,
  InstallmentType,
  Rounding,
} from "installment-js";

const result = calculateInstallment(500, 12, 7.5);

const result1 = calculateInstallment(500, 12, 7.5, InstallmentType.PIDE);

const result1 = calculateInstallment(
  500,
  12,
  7.5,
  InstallmentType.PIDE,
  Rounding.TWO
);
```

## Contributing

Im open for contributors :).

## Release History

#### 2024-03-04 v1.0.7

- Updated the formula for **rincipal and interest divided equally**. The formula for calculating the monthly payment for a loan in the annuity method is as follows:
  `PMT = (P * r * (1 + r)^n) / ((1 + r)^n - 1)`
