// src/components/Trade.js
import React, { useState } from 'react';

const Trade = ({ stockSymbol, currentPrice, onBuyStock }) => {
  const [quantity, setQuantity] = useState(1);

  const handleTradeSubmit = (e) => {
    e.preventDefault();
    if (typeof onBuyStock === 'function') {
      onBuyStock(stockSymbol, quantity, currentPrice);
      alert(`Bought ${quantity} shares of ${stockSymbol} at $${currentPrice} each.`);
    } else {
      console.error('onBuyStock is not a function');
    }
  };

  return (
    <form onSubmit={handleTradeSubmit}>
      <h2>Trade {stockSymbol}</h2>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
      />
      <button type="submit">Buy Stock</button>
    </form>
  );
};

export default Trade;