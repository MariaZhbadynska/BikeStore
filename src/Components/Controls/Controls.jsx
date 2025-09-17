import React from "react";
import './Controls.scss'

export default function Controls({
  orderBy,
  setOrderBy,
  page,
  setPage,
  pageCount,
  pageSize,
  setPageSize,
  total,
}) {
  const chips = ["Lowest price", "Newest Listings", "Closest", "Retailer"];
  const pages = Array.from(
    { length: Math.min(pageCount, 10) },
    (_, i) => i + 1
  );

  const go = (p) => {
    if (p < 1 || p > pageCount) return;
    setPage(p);
  };

  return (
    <section className="panel p16" aria-labelledby="controls-heading">
      <div className="orderbar">
        <div className="order__label">Order by</div>
        <div className="chips">
          {chips.map((x) => (
            <button
              key={x}
              className={"chip" + (orderBy === x ? " is-active" : "")}
              onClick={() => setOrderBy(x)}
            >
              {x}
            </button>
          ))}
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
        <label className="muted" htmlFor="page-size">Results per page</label>
        <select
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
