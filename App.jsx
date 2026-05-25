import { useMemo, useState } from "react";
import "./index.css";

export default function App() {
  const [form, setForm] = useState({
    customerName: "",
    quantity: 50000,
    totalUpsPaper: 8,
    paperRate: 11,
    laminationRate: 2,
    cutting: 1000,
    strike1: 1200,
    additional: 14400,
    packing: 1000,
    transport: 1000,
    marginMultiplier: 0.1,
    gstPercent: 18,
  });

  const handle = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const calc = useMemo(() => {
    const requiredSheet = form.quantity / form.totalUpsPaper + 50;
    const requiredSheetPrinting = requiredSheet * 2;
    const paperCost = requiredSheet * form.paperRate;
    const plateCost = 1200;
    const printingCost = form.strike1 + form.additional;
    const laminationCost = requiredSheetPrinting * form.laminationRate;

    const subtotal =
      paperCost +
      plateCost +
      printingCost +
      laminationCost +
      form.cutting +
      form.packing +
      form.transport;

    const ratePerCard = subtotal / form.quantity;
    const marginValue = ratePerCard * form.marginMultiplier;
    const finalRate = ratePerCard + marginValue;
    const finalAmount = finalRate * form.quantity;
    const gstAmount = (finalAmount * form.gstPercent) / 100;
    const grandTotal = finalAmount + gstAmount;

    return {
      requiredSheet,
      subtotal,
      finalRate,
      finalAmount,
      gstAmount,
      grandTotal,
    };
  }, [form]);

  const Field = ({ label, value, onChange }) => (
    <div className="field">
      <label>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
    </div>
  );

  return (
    <div className="app">
      <div className="header">
        <div>
          <h1>Pristine Prints Private Limited</h1>
          <p>Print Cost Calculator</p>
        </div>
      </div>

      <div className="grid">
        <div className="panel">
          <h2>Inputs</h2>

          <Field label="Quantity" value={form.quantity} onChange={(v) => handle("quantity", v)} />
          <Field label="Ups Paper" value={form.totalUpsPaper} onChange={(v) => handle("totalUpsPaper", v)} />
          <Field label="Paper Rate" value={form.paperRate} onChange={(v) => handle("paperRate", v)} />
          <Field label="Lamination Rate" value={form.laminationRate} onChange={(v) => handle("laminationRate", v)} />
          <Field label="Cutting" value={form.cutting} onChange={(v) => handle("cutting", v)} />
          <Field label="Strike 1" value={form.strike1} onChange={(v) => handle("strike1", v)} />
          <Field label="Additional" value={form.additional} onChange={(v) => handle("additional", v)} />
          <Field label="Packing" value={form.packing} onChange={(v) => handle("packing", v)} />
          <Field label="Transport" value={form.transport} onChange={(v) => handle("transport", v)} />
          <Field label="Margin" value={form.marginMultiplier} onChange={(v) => handle("marginMultiplier", v)} />
          <Field label="GST %" value={form.gstPercent} onChange={(v) => handle("gstPercent", v)} />
        </div>

        <div className="panel">
          <h2>Results</h2>

          <div className="card">
            <span>Required Sheet</span>
            <strong>{calc.requiredSheet.toFixed(2)}</strong>
          </div>

          <div className="card">
            <span>Subtotal</span>
            <strong>₹ {calc.subtotal.toFixed(2)}</strong>
          </div>

          <div className="card">
            <span>Final Rate</span>
            <strong>₹ {calc.finalRate.toFixed(2)}</strong>
          </div>

          <div className="card">
            <span>Final Amount</span>
            <strong>₹ {calc.finalAmount.toFixed(2)}</strong>
          </div>

          <div className="card">
            <span>GST Amount</span>
            <strong>₹ {calc.gstAmount.toFixed(2)}</strong>
          </div>

          <div className="grand">
            <span>Grand Total</span>
            <strong>₹ {calc.grandTotal.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
