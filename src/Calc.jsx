import { useState, useEffect } from "react";
import { calculateSl, calculateProfitPrice } from "./CoreLogic";
export default function Calc() {
  const [maxRisk, setMaxRisk] = useState(1000);
  const [lotSize, setLotSize] = useState(15);
  const [entryPrice, setEntryPrice] = useState(44);
  const [tradeType, setTradeType] = useState("BUY");
  const [sl, setSl] = useState(0);
  const [breakevenPrice, setBreakevenPrice] = useState(0);

  useEffect(() => {
    let [newSl, newBreakevenPrice] = calculateSl(
      maxRisk,
      lotSize,
      entryPrice,
      tradeType
    );
    setSl(newSl);
    setBreakevenPrice(newBreakevenPrice);
  }, [maxRisk, lotSize, entryPrice, tradeType]);

  return (
    <div className="calculator text-white">
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

      <div className="breakevenCalculation">
        <label>
          BE
          <input
            type="text"
            readOnly
            className="px-2 m-2 border-[1px] rounded-md border-slate-200 bg-inherit"
            value={breakevenPrice}
          />
        </label>
      </div>

      <div className="profitPrices">
        <div className="profit_0.5xRisk">
          <label>
            0.5:1 P
            <input
              type="text"
              readOnly
              className="px-2 m-2 border-[1px] rounded-md border-slate-200 bg-inherit"
              value={calculateProfitPrice(
                0.5,
                maxRisk,
                lotSize,
                entryPrice,
                tradeType
              )}
            />
          </label>
        </div>
        <div className="profit_1xRisk">
          <label>
            1:1 P
            <input
              type="text"
              readOnly
              className="px-2 m-2 border-[1px] rounded-md border-slate-200 bg-inherit"
              value={calculateProfitPrice(
                1,
                maxRisk,
                lotSize,
                entryPrice,
                tradeType
              )}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
