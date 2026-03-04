"use client";

import React, { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

  .products-wrapper {
    font-family: 'DM Mono', monospace;
    background: #0a0a0a;
    min-height: 100vh;
    padding: 0;
  }

  .products-grid {
    margin-top: 2rem;
    display: grid;
    gap: 1px;
    grid-template-columns: 1fr;
    background: #1a1a1a;
    border: 1px solid #1a1a1a;
  }

  @media (min-width: 640px) {
    .products-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (min-width: 1024px) {
    .products-grid { grid-template-columns: repeat(3, 1fr); }
  }

  .product-card {
    background: #0a0a0a;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: background 0.4s ease;
  }

  .product-card:hover {
    background: #111;
  }

  .product-card:hover .card-img {
    transform: scale(1.04);
    filter: brightness(0.85) contrast(1.1);
  }

  .product-card:hover .card-index {
    opacity: 1;
    transform: translateY(0);
  }

  .product-card:hover .card-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  .img-container {
    overflow: hidden;
    position: relative;
    aspect-ratio: 4/3;
  }

  .img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.6) 100%);
    z-index: 1;
  }

  .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: brightness(0.9) saturate(0.85);
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                filter 0.4s ease;
  }

  .card-body {
    padding: 1.25rem 1.5rem 1.5rem;
    position: relative;
  }

  .card-index {
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    color: #666;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    opacity: 0.6;
    transform: translateY(4px);
    transition: opacity 0.3s, transform 0.3s;
  }

  .card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.35rem;
    font-weight: 300;
    color: #e8e8e0;
    letter-spacing: 0.01em;
    line-height: 1.2;
    margin: 0 0 0.4rem;
  }

  .card-desc {
    font-size: 0.7rem;
    color: #555;
    letter-spacing: 0.04em;
    line-height: 1.6;
    margin: 0 0 1rem;
    text-transform: uppercase;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #1c1c1c;
    padding-top: 0.85rem;
  }

  .card-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #c9b97a;
    letter-spacing: 0.03em;
  }

  .card-arrow {
    font-size: 0.75rem;
    color: #444;
    letter-spacing: 0.1em;
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity 0.3s, transform 0.35s ease;
  }

  .empty-state {
    padding: 4rem 2rem;
    text-align: center;
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem;
    color: #333;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }
`;

export default function ProductsClient({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts || []);

  if (!products || products.length === 0)
    return (
      <>
        <style>{styles}</style>
        <div className="products-wrapper">
          <p className="empty-state">— No products available —</p>
        </div>
      </>
    );

  return (
    <>
      <style>{styles}</style>
      <div className="products-wrapper">
        <div className="products-grid mt-8">
          {products.map((p, i) => (
            <div key={p._id} className="product-card">
              <div className="img-container">
                <div className="img-overlay" />
                <img src={p.image} alt={p.title} className="card-img" />
              </div>
              <div className="card-body">
                <div className="card-index">
                  {String(i + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                </div>
                <h2 className="card-title">{p.title}</h2>
                <p className="card-desc">{p.shortDescription}</p>
                <div className="card-footer">
                  <span className="card-price">${p.price}</span>
                  <span className="card-arrow">VIEW →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
