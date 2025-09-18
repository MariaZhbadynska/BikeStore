import React, { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "../../data";
import "./Controls.scss";

export const norm = (s) => s.toLowerCase().replace(/\s+/g, " ").trim();

function SpecFilter({ picked, setPicked }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const select = (label) => {
    const key = norm(label);
    setPicked(picked.has(key) ? new Set() : new Set([key]));
  };

  return (
    <span className="spec-wrap" ref={ref}>
      <button
        type="button"
        className={"chip" + (picked.size ? " is-active" : "")}
        onClick={() => setOpen((v) => !v)}
      >
        Specification
      </button>

      {open && (
        <div className="dropdown">
          <ul className="dropdown__list" role="list">
            {CATEGORIES.map((label) => {
              const key = norm(label);
              return (
                <li key={key} className="dropdown__item">
                  <label className="dropdown__label">
                    <span className="dropdown__text">{label}</span>
                    <input
                      type="radio"
                      name="spec-category"
                      className="dropdown__check"
                      checked={picked.has(key)}
                      onChange={() => select(label)}
                    />
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </span>
  );
}

export default function Controls({
  orderBy,
  setOrderBy,
  page,
  setPage,
  pageCount,
  pageSize,
  setPageSize,
  selectedCats,
  setSelectedCats,
}) {
  const chips = ["Lowest price", "Newest Listings", "Closest", "Retailer"];
  const hasSpec = selectedCats.size > 0;
  const pages = Array.from(
    { length: Math.min(pageCount, 10) },
    (_, i) => i + 1
  );
  const go = (p) => p >= 1 && p <= pageCount && setPage(p);

  const pickOrder = (x) => {
    setSelectedCats(new Set());
    setOrderBy(x);
  };

  return (
    <section className="panel p16">
      <div className="orderbar">
        <div className="order__label">Order by</div>
        <div className="chips">
          {chips.map((x) => (
            <button
              key={x}
              className={
                "chip" + (!hasSpec && orderBy === x ? " is-active" : "")
              }
              onClick={() => pickOrder(x)}
            >
              {x}
            </button>
          ))}
          <SpecFilter picked={selectedCats} setPicked={setSelectedCats} />
        </div>
      </div>

      <nav className="pagerline" aria-label="Pagination">
        <div className="pager pager--left">
          <div className="pager--left_b">
            <button
              className="pill"
              onClick={() => go(1)}
              disabled={page === 1}
            >
              First
            </button>
            <button
              className="pill"
              onClick={() => go(page - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
          </div>
          {pages.map((n) => (
            <button
              key={n}
              className={"pill" + (n === page ? " pill--active" : "")}
              onClick={() => go(n)}
            >
              {n}
            </button>
          ))}
        </div>

        <div className="pager pager--center">
          <button
            className="pill"
            onClick={() => go(page + 1)}
            disabled={page === pageCount}
          >
            Next
          </button>
          <button
            className="pill"
            onClick={() => go(pageCount)}
            disabled={page === pageCount}
          >
            Last
          </button>
        </div>

        <div className="pager__right">
          <label className="muted" htmlFor="page-size">
            Results per page
          </label>
          <select
            id="page-size"
            className="select select--sm"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 20, 30, 40].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </nav>
    </section>
  );
}
