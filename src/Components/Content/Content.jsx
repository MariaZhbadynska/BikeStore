import React, { useEffect, useState } from "react";
import { PRODUCTS } from "../../data";
import Filters from "../Filters/Filters";
import Controls from "../Controls/Controls";
import "./Content.scss";

const MIN_PRICE = Math.min(...PRODUCTS.map((p) => p.price));
const MAX_PRICE = Math.max(...PRODUCTS.map((p) => p.price));

const Card = ({ item }) => (
  <li>
    <article className="card">
      <div>
        <div className="meta">{item.category}</div>
        <h3 className="card__title">{item.title}</h3>
        <div className="meta">{item.seller}</div>
      </div>
      <div className="price">
        {"$" + Number(item.price) + ".00".toLocaleString()}
      </div>
    </article>
  </li>
);

export default function Content() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("d", dark);
  }, [dark]);

  const [data] = useState(PRODUCTS);
  const [range, setRange] = useState([MIN_PRICE, MAX_PRICE]);
  const [orderBy, setOrderBy] = useState("Lowest price");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [range, orderBy, pageSize]);

  const filtered = data.filter(
    (d) => d.price >= range[0] && d.price <= range[1]
  );
  const avg = filtered.length
    ? Math.round(
        filtered.reduce((sum, item) => sum + item.price, 0) / filtered.length
      )
    : 0;

  const sorted = (() => {
    const arr = [...filtered];
    if (orderBy === "Lowest price") arr.sort((a, b) => a.price - b.price);
    else if (orderBy === "Newest Listings")
      arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (orderBy === "Retailer")
      arr.sort((a, b) => (a.seller === "Retailer" ? -1 : 1));
    else if (orderBy === "Closest") {
      const target = 180;
      arr.sort(
        (a, b) => Math.abs(a.price - target) - Math.abs(b.price - target)
      );
    }
    return arr;
  })();

  const total = sorted.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [pageCount, page]);
  const start = (page - 1) * pageSize;
  const visible = sorted.slice(start, start + pageSize);

  return (
    <main className="wrap">
      <Filters
        dark={dark}
        setDark={setDark}
        min={MIN_PRICE}
        max={MAX_PRICE}
        value={range}
        onChange={setRange}
        avg={avg}
      />

      <p id="results-count" className="count" aria-live="polite">
        {total} bikes found
      </p>
      <Controls
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        page={page}
        setPage={setPage}
        pageCount={pageCount}
        pageSize={pageSize}
        setPageSize={setPageSize}
        total={total}
      />

      <section className="list">
        {visible.map((item) => (
          <Card key={item.id} item={item} />
        ))}
        {!visible.length && (
          <div className="meta">Nothing found in this price range.</div>
        )}
      </section>
    </main>
  );
}
