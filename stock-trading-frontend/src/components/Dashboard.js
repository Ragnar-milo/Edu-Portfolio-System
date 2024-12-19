import React, { useState, useEffect } from 'react';
import Trade from './Trade'; 
import './Dashboard.css'; 

const Dashboard = ({ onLogout }) => { 
  const [portfolio, setPortfolio] = useState({});
  const [selectedStock, setSelectedStock] = useState(null);
  const [sampleStocks, setSampleStocks] = useState([
    { name: "Apple Inc.", symbol: "AAPL", price: 150.00 },
    { name: "Microsoft Corporation", symbol: "MSFT", price: 250.00 },
    { name: "Amazon.com, Inc.", symbol: "AMZN", price: 3300.00 },
    { name: "Tesla, Inc.", symbol: "TSLA", price: 700.00 },
    { name: "Alphabet Inc.", symbol: "GOOGL", price: 2800.00 },
  ]);

  const handleBuyStock = (symbol, quantity, currentPrice) => {
    setPortfolio(prevPortfolio => {
      const existingStock = prevPortfolio[symbol];
      const newQuantity = existingStock ? existingStock.quantity + quantity : quantity;
      return {
        ...prevPortfolio,
        [symbol]: {
          quantity: newQuantity,
          currentPrice: currentPrice
        }
      };
    });
  };

  const handleSelectStock = (stock) => {
    setSelectedStock(stock);
  };

  const handleLogout = () => {
    onLogout();
  };

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch('https://api.example.com/stocks');
        const data = await response.json();
        setSampleStocks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStockData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Stock Trading Dashboard</h1>
      
      {/* Display sample stocks */}
      <h2>Available Stocks</h2>
      <div className="stock-list">
        {sampleStocks.map(stock => (
          <div key={stock.symbol} className="stock-card" onClick={() => handleSelectStock(stock)}>
            <h3>{stock.name} ({stock.symbol})</h3>
            <p>Price: ${stock.price}</p>
          </div>
        ))}
      </div>

      {/* Show Trade component if a stock is selected */}
      {selectedStock && (
        <Trade 
          stockSymbol={selectedStock.symbol} 
          currentPrice={selectedStock.price} 
          onBuyStock={handleBuyStock} 
        />
      )}

      {/* Display the portfolio */}
      <h2>Your Portfolio</h2>
      <div className="portfolio">
        {Object.keys(portfolio).length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Stock Symbol</th>
                <th>Quantity</th>
                <th>Current Price</th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(portfolio).map(([symbol, { quantity, currentPrice }]) => (
                <tr key={symbol}>
                  <td>{symbol}</td>
                  <td>{quantity}</td>
                  <td>${currentPrice.toFixed(2)}</td>
                  <td>${(quantity * currentPrice).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Your portfolio is empty.</p>
        )}
      </div>

      <button 
        onClick={handleLogout} 
        className="logout-button" 
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;