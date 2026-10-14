import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Info } from 'lucide-react';

export const ExportCostingCalculator: React.FC = () => {
  const [productCostPerKg, setProductCostPerKg] = useState<number>(180);
  const [packingCostPerKg, setPackingCostPerKg] = useState<number>(15);
  const [quantityKg, setQuantityKg] = useState<number>(1000);
  const [localTransportTotal, setLocalTransportTotal] = useState<number>(8000);
  const [chaAndPortTotal, setChaAndPortTotal] = useState<number>(12000);
  const [oceanFreightUsd, setOceanFreightUsd] = useState<number>(650);
  const [insurancePercent, setInsurancePercent] = useState<number>(0.5);
  const [bankChargesPercent, setBankChargesPercent] = useState<number>(1.0);
  const [profitMarginPercent, setProfitMarginPercent] = useState<number>(20);
  const [usdInrRate, setUsdInrRate] = useState<number>(84.0);

  // Calculations
  const baseProductCostPerKg = productCostPerKg + packingCostPerKg;
  const exWorksTotalInr = baseProductCostPerKg * quantityKg;
  const exWorksPerKgInr = baseProductCostPerKg;
  const exWorksPerKgUsd = exWorksPerKgInr / usdInrRate;

  const localFreightPerKg = localTransportTotal / quantityKg;
  const chaPortPerKg = chaAndPortTotal / quantityKg;
  const fobCostBeforeMarginInr = exWorksPerKgInr + localFreightPerKg + chaPortPerKg;
  const marginInr = fobCostBeforeMarginInr * (profitMarginPercent / 100);
  const fobPerKgInr = fobCostBeforeMarginInr + marginInr;
  const fobPerKgUsd = fobPerKgInr / usdInrRate;

  const freightPerKgUsd = oceanFreightUsd / quantityKg;
  const freightPerKgInr = freightPerKgUsd * usdInrRate;
  const insurancePerKgInr = (fobPerKgInr + freightPerKgInr) * (insurancePercent / 100);
  const bankChargesPerKgInr = (fobPerKgInr + freightPerKgInr) * (bankChargesPercent / 100);
  const cifPerKgInr = fobPerKgInr + freightPerKgInr + insurancePerKgInr + bankChargesPerKgInr;
  const cifPerKgUsd = cifPerKgInr / usdInrRate;

  // Slabs calculation for 500kg, 1T, 5T, 14T FCL
  const slabs = [500, 1000, 5000, 14000].map((qty) => {
    const sLocalFreight = localTransportTotal / qty;
    const sChaPort = chaAndPortTotal / qty;
    const sFobBase = baseProductCostPerKg + sLocalFreight + sChaPort;
    const sMargin = sFobBase * (profitMarginPercent / 100);
    const sFobInr = sFobBase + sMargin;
    const sFobUsd = sFobInr / usdInrRate;

    // Freight economies: FCL container ocean freight scales favorably
    const sOceanFreight = qty >= 14000 ? 1800 : oceanFreightUsd * (qty / 1000) * 0.85;
    const sFreightPerKgUsd = sOceanFreight / qty;
    const sCifUsd = sFobUsd + sFreightPerKgUsd;

    return {
      quantity: qty,
      fobUsd: sFobUsd.toFixed(2),
      cifUsd: sCifUsd.toFixed(2),
      fobInr: Math.round(sFobInr),
    };
  });

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-6 rounded-2xl shadow-lg border border-emerald-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-amber-300 mb-1">
            <Calculator className="w-5 h-5" />
            <span className="text-xs uppercase font-bold tracking-wider">
              Topic 4 • Practical Costing Sheet
            </span>
          </div>
          <h3 className="text-xl font-bold text-white">
            Export Price Calculation Playground
          </h3>
          <p className="text-xs text-emerald-200 mt-1 max-w-xl">
            Simulate your Ex-Works (Factory Gate) to FOB (Tuticorin Port) and CIF (Hamburg Port)
            costing breakdown step-by-step.
          </p>
        </div>

        <div className="bg-emerald-800/40 border border-emerald-600/40 rounded-xl p-3 text-xs text-emerald-100 flex items-center space-x-3">
          <Info className="w-5 h-5 text-amber-400 shrink-0" />
          <span>
            Current Exchange Rate: <strong>1 USD = ₹{usdInrRate.toFixed(2)}</strong>
          </span>
        </div>
      </div>

      {/* Inputs & Outputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cost Inputs Panel */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h4 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100 flex items-center space-x-2">
            <span>Cost Heads & Logistics Parameters</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Raw Product Cost (₹ / kg)
              </label>
              <input
                type="number"
                value={productCostPerKg}
                onChange={(e) => setProductCostPerKg(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Packing Cost (₹ / kg)
              </label>
              <input
                type="number"
                value={packingCostPerKg}
                onChange={(e) => setPackingCostPerKg(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Order Quantity (kg)
              </label>
              <input
                type="number"
                value={quantityKg}
                onChange={(e) => setQuantityKg(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Local Trucking to Port (₹ Total)
              </label>
              <input
                type="number"
                value={localTransportTotal}
                onChange={(e) => setLocalTransportTotal(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                CHA & Port Handling Charges (₹ Total)
              </label>
              <input
                type="number"
                value={chaAndPortTotal}
                onChange={(e) => setChaAndPortTotal(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ocean Freight (USD Total)
              </label>
              <input
                type="number"
                value={oceanFreightUsd}
                onChange={(e) => setOceanFreightUsd(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Profit Margin Target (%)
              </label>
              <input
                type="number"
                value={profitMarginPercent}
                onChange={(e) => setProfitMarginPercent(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                USD / INR Exchange Rate
              </label>
              <input
                type="number"
                value={usdInrRate}
                onChange={(e) => setUsdInrRate(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Results Output Cards */}
        <div className="space-y-4">
          <div className="bg-emerald-950 text-white rounded-2xl p-5 border border-emerald-800 shadow-md">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
              Ex-Works Price (Factory Gate)
            </span>
            <div className="text-2xl font-black">
              ${exWorksPerKgUsd.toFixed(2)} <span className="text-sm font-normal text-emerald-300">/ kg</span>
            </div>
            <div className="text-xs text-emerald-300/80 mt-1">
              ₹{exWorksPerKgInr.toFixed(2)} per kg (Order Value: ₹{exWorksTotalInr.toLocaleString()})
            </div>
          </div>

          <div className="bg-emerald-900 text-white rounded-2xl p-5 border border-emerald-700 shadow-md">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
              FOB Price (Tuticorin Port)
            </span>
            <div className="text-2xl font-black">
              ${fobPerKgUsd.toFixed(2)} <span className="text-sm font-normal text-emerald-200">/ kg</span>
            </div>
            <div className="text-xs text-emerald-200/80 mt-1">
              ₹{Math.round(fobPerKgInr)} per kg (Includes {profitMarginPercent}% margin)
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-md">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              CIF Price (Hamburg Port)
            </span>
            <div className="text-2xl font-black text-amber-400">
              ${cifPerKgUsd.toFixed(2)} <span className="text-sm font-normal text-slate-300">/ kg</span>
            </div>
            <div className="text-xs text-slate-300/80 mt-1">
              ₹{Math.round(cifPerKgInr)} per kg (Includes Ocean Freight & Marine Insurance)
            </div>
          </div>
        </div>
      </div>

      {/* Quantity-wise Slabs Table (From Handbook) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-sm">
              Quantity-Wise Price Slabs (Economies of Scale)
            </h4>
            <p className="text-xs text-slate-500">
              Shows foreign buyers how per-kg port and transport overhead decreases with scale.
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
            Export Slabs
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="py-2.5 px-3">Order Quantity</th>
                <th className="py-2.5 px-3">FOB Tuticorin (USD/kg)</th>
                <th className="py-2.5 px-3">CIF Hamburg (USD/kg)</th>
                <th className="py-2.5 px-3">Price in INR</th>
                <th className="py-2.5 px-3">Advantage Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {slabs.map((slab, idx) => (
                <tr key={slab.quantity} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-slate-900">
                    {slab.quantity >= 1000 ? `${slab.quantity / 1000} Tons` : `${slab.quantity} Kg`}
                    {slab.quantity === 14000 && ' (20ft FCL Container)'}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-emerald-800">
                    ${slab.fobUsd} / kg
                  </td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">
                    ${slab.cifUsd} / kg
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    ₹{slab.fobInr} / kg
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">
                    {idx === 0
                      ? 'LCL baseline; higher per-kg port minimum charges'
                      : idx === 1
                      ? 'Fixed CHA costs diluted across 1,000 kg'
                      : idx === 2
                      ? 'Bulk road transit discount from Madurai'
                      : 'Maximum volume discount; full container ocean rate'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
