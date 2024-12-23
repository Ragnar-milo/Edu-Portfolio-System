import React from 'react';

const Portfolio = ({ portfolio }) => {
  const totalEarnings = Object.keys(portfolio).reduce((total, symbol) => {
    const stock = portfolio[symbol];
    return total + (stock.quantity * stock.currentPrice);
  }, 0);

  return (
    <div className="portfolio">
      <h2>Your Portfolio</h2>
      <ul>
        {Object.keys(portfolio).length === 0 ? (
          <li>No stocks purchased yet.</li>
        ) : (
          Object.keys(portfolio).map(symbol => {
            const stock = portfolio[symbol];
            return (
              <li key={symbol}>
                {symbol}: {stock.quantity} shares
                <br />
                Current Price: ${stock.currentPrice.toFixed(2)}
                <br />
                Total Value: ${(stock.quantity * stock.currentPrice).toFixed(2)}
              </li>
            );
          })
        )}
      </ul>
      <h3>Total Earnings: ${totalEarnings.toFixed(2)}</h3>
    </div>
  );
};

export default Portfolio;