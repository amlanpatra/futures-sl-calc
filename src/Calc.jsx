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
import { useState, useEffect } from "react";
export default function Calc() {
  const [maxRisk, setMaxRisk] = useState(1000);
  const [lotSize, setLotSize] = useState(15);
  const [entryPrice, setEntryPrice] = useState(47);
  const [tradeType, setTradeType] = useState("BUY");
  const [sl, setSl] = useState(0);

  useEffect(() => {
    let newSl;
    if (tradeType == "BUY") {
      newSl = parseFloat(entryPrice) - parseFloat(maxRisk) / parseInt(lotSize);
    } else if (tradeType == "SELL") {
      newSl = parseFloat(entryPrice) + parseFloat(maxRisk) / parseInt(lotSize);
    }
    newSl = Math.round(newSl * 100) / 100; // for 2 floating digits
    setSl(newSl);
  }, [maxRisk, lotSize, entryPrice, tradeType]);

  return (
    <div className="text-white">
      <div className="inputs">
        <label>
          Max Risk
          <input
            type="number"
            className="m-2 border-[1px] rounded-md border-slate-200 bg-inherit"
            onChange={(e) => setMaxRisk(e.target.value)}
            value={maxRisk}
          />
        </label>
        <br />
        <label>
          Lot Size
          <input
            type="number"
            className="m-2 border-[1px] rounded-md border-slate-200 bg-inherit"
            onChange={(e) => setLotSize(e.target.value)}
            value={lotSize}
          />
        </label>
        <br />
        <label>
          Entry Price
          <input
            type="number"
            className="m-2 border-[1px] rounded-md border-slate-200 bg-inherit"
            onChange={(e) => setEntryPrice(e.target.value)}
            value={entryPrice}
          />
        </label>
        <br />
      </div>
      <div className="tradeType flex justify-around">
        <label className="mr-2">
          Buy
          <input
            type="radio"
            id="BUY"
            name="type"
            value="BUY"
            checked={tradeType == "BUY"}
            onClick={() => setTradeType("BUY")}
            onChange={() => {}} // to avoid warning
          />
        </label>
        <label className="mr-2">
          Sell
          <input
            type="radio"
            id="SELL"
            name="type"
            value="SELL"
            checked={tradeType == "SELL"}
            onClick={() => setTradeType("SELL")}
            onChange={() => {}} // to avoid warning
          />
        </label>
      </div>

      <div className="maxSL">
        <label>
          Max SL
          <input
            type="text"
            readOnly
            className="px-2 m-2 border-[1px] rounded-md border-slate-200 bg-inherit"
            value={sl}
          />
        </label>
      </div>
    </div>
  );
}
