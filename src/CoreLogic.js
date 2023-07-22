// inputs :
// Max risk
// Lot size
// Entry price
// Buy/Sell radio button

// output :
// maximum permitted SL to stay between max risk

// logic :
// for buy
// SL = Entry price - (max risk / lot size)

// for short
// SL = Entry price + (max risk / lot size)

// internal calculation of brokerages

function calculateSl(maxRisk, lotSize, entryPrice, tradeType) {
  let newSl;
  let brokerageCharges = calculateBrokerage(lotSize, entryPrice);
  maxRisk = maxRisk - brokerageCharges;
  let breakeven = parseFloat(brokerageCharges) / parseInt(lotSize);
  let breakevenPrice;

  if (tradeType == "BUY") {
    newSl = parseFloat(entryPrice) - parseFloat(maxRisk) / parseInt(lotSize);
    breakevenPrice = parseFloat(entryPrice) + parseFloat(breakeven);
  } else if (tradeType == "SELL") {
    newSl = parseFloat(entryPrice) + parseFloat(maxRisk) / parseInt(lotSize);
    breakevenPrice = parseFloat(entryPrice) - parseFloat(breakeven);
  }
  newSl = Math.round(newSl * 100) / 100; // for 2 floating digits
  breakevenPrice = Math.round(breakevenPrice * 100) / 100;
  return [newSl, breakevenPrice];
}

function calculateBrokerage(lotSize, entryPrice) {
  // TODO: Actual calculation is yet to be done. Taking 200/- as default
  let brokerage = 20 + 20; // 0.03% or Rs.20 which is lower
  let sebiTurnoverFee;
  let exchangeTurnoverFee;
  let stampDuty;
  let transactionTax_STT = entryPrice * lotSize * 0.0125; // 0.0125% on the sell side
  let GST;
  //   console.log(entryPrice * lotSize * 2, brokerage, transactionTax_STT);
  let totalBrokerages = 200;
  return totalBrokerages;
}

function calculateProfitPrice(
  profitRatio = 0.5,
  maxRisk,
  lotSize = 15,
  entryPrice,
  tradeType
) {
  let profitTotal =
    parseFloat(maxRisk) * parseFloat(profitRatio) +
    parseFloat(calculateBrokerage(lotSize, entryPrice));

  let profitPerUnit = profitTotal / parseFloat(lotSize);

  let profitPrice =
    tradeType == "BUY"
      ? parseFloat(entryPrice) + profitPerUnit
      : parseFloat(entryPrice) - profitPerUnit;

  profitPrice = parseInt(profitPrice * 100) / 100;

  return profitPrice;
}

export { calculateSl, calculateProfitPrice };
