import React, { useRef } from "react";
import "./PriceHistogram.scss";

export default function PriceHistogram({ min, max, value, onChange }) {
  const [lo, hi] = value;
  const trackRef = useRef(null);

  const bars = [
    16, 24, 16, 33, 38, 51, 58, 62, 58, 42, 56, 50, 56, 63, 65, 74, 79, 72, 55,
    42, 71, 85, 71, 78, 64, 57, 52, 48, 43, 48, 39, 48, 54, 65, 75, 92, 102, 86,
    76, 67, 56, 47, 43, 40, 32, 50, 33, 25, 16, 10,
  ];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const toPct = (v) => ((v - min) / (max - min)) * 100;
  const pct = (v) => ((v - min) / (max - min)) * 100;

  function startDrag(which, e) {
    e.preventDefault();
    const rect = trackRef.current.getBoundingClientRect();

    const move = (ev) => {
      const x = clamp(ev.clientX - rect.left, 0, rect.width);
      const v = Math.round(min + (x / rect.width) * (max - min));
      if (which === "min") onChange([Math.min(v, hi), hi]);
      else onChange([lo, Math.max(v, lo)]);
    };

    const stop = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
  }

  return (
    <div className="hist">
      <div className="hist__bars">
        {bars.map((h, i) => (
          <b key={i} style={{ height: h }} />
        ))}
      </div>

      <div className="slider" ref={trackRef}>
        <div className="slider__track" />
        <div
          className="slider__range"
          style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
        />
        <i
          className="slider__thumb"
          style={{ left: `${toPct(lo)}%` }}
          onMouseDown={(e) => startDrag("min", e)}
        />
        <i
          className="slider__thumb"
          style={{ left: `${toPct(hi)}%` }}
          onMouseDown={(e) => startDrag("max", e)}
        />
      </div>
    </div>
  );
}
