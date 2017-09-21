import BigNumber from 'bignumber.js';

// ether units: https://github.com/ethereum/web3.js/blob/0.15.0/lib/utils/utils.js#L40
export const ETH_DECIMALS = new BigNumber(10).pow(18);

// acebuster units:
// 1 x 10^12 - Nutz   (NTZ)
// 1 x 10^9 - Jonyz
// 1 x 10^6 - Helcz
// 1 x 10^3 - Pascalz
// 1 x 10^0 - Babz
export const NTZ_DECIMALS = new BigNumber(10).pow(12);

export const ABP_DECIMALS = new BigNumber(10).pow(12);

export const babz = (ntz) => NTZ_DECIMALS.mul(ntz);

export const bn = (amount) => (typeof amount === 'object' && amount !== null) ? amount : new BigNumber(amount || 0);

export function toAmount(decimals, amount) {
  const amountBn = bn(amount);
  return amountBn.div(decimals);
}

export function formatAmount(decimals, amount, dp) {
  const divBn = toAmount(decimals, amount);
  const decimalPlaces = dp === undefined ? divBn.dp() : dp;
  return divBn.toFormat(decimalPlaces);
}

export const toEth = toAmount.bind(null, ETH_DECIMALS);
export const toNtz = toAmount.bind(null, NTZ_DECIMALS);
export const formatNtz = (amount, dp = 0) => formatAmount(NTZ_DECIMALS, amount, dp);
export const formatAbp = formatAmount.bind(null, ABP_DECIMALS);
export const formatEth = formatAmount.bind(null, ETH_DECIMALS);
// format number: formatNum(10000.03924832, 2) => 10,000.00
export const formatNum = (amount, dp) => formatAmount(new BigNumber(1), amount, dp);

// give a float of 0.02088839248, return '0.020'
export const percent3FixedDec = (float) => parseFloat(Math.round(float * 1000) / 1000).toFixed(3);

// only allow digits and one dot
export const normalizerFloat = (value) => {
  if (value === '.') return '0.';
  return value.replace(',', '.').replace(/[^0-9.]/g, '').replace(/\./, 'x').replace(/\./g, '').replace(/x/, '.');
};
