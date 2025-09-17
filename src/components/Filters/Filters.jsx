import React from "react";
import PriceHistogram from "../PriceHistogram/PriceHistogram";
import NumberInput from "../NumberInput/NumberInput";
import './Filters.scss'
export default function Filters({
  dark,
  setDark,
  min,
  max,
  value,
  onChange,
  avg,
}) {
  const [lo, hi] = value;
  const clamp = (v, a, b) => Math.max(a, Math.min(v, b));
  const money = (n) => "$" + n;

  return (
    <section className="panel">
      <header className="panel__head">
      <h2 id="filters-heading" className="panel__title">Filters</h2>
      <button
          type="button"
          className="panel__close"
          aria-label="Close filters"
        >
          ×
        </button>
      </header>

      <div className="hr" />

      <div className="pricehead">
        <div className="h2">Price Range</div>
        <label
          className={"toggle" + (dark ? " is-on" : "")}
          onClick={() => setDark(!dark)}
        >
          <span className="toggle__text">Dark mode</span>
          <span className="toggle__track">
            <i />
          </span>
        </label>
      </div>

      <div className="sub">The average nightly price is ${avg}</div>

      <PriceHistogram min={min} max={max} value={value} onChange={onChange} />

      <div className="fields2">
        <label className="field">
          <div className="field__box">
            <span className="label">Min price</span>
            <div className="fields-flex">
              <span className="currency">$</span>
              <NumberInput
                className={"price-input"}
                value={lo}
                min={min}
                max={hi}
                onCommit={(v) => onChange([clamp(v, min, hi), hi])}
              />
            </div>
          </div>
        </label>

        <label className="field">
          <div className="field__box">
            <span className="label">Max price</span>

            <div className="fields-flex">
              <span className="currency">$</span>
              <NumberInput
                value={hi}
                min={lo}
                max={max}
                onCommit={(v) => onChange([lo, clamp(v, lo, max)])}
              />
            </div>
          </div>
        </label>
      </div>
    </section>
  );
}
