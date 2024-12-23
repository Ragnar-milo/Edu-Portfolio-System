import React, { useState, useEffect } from 'react';
import Trade from './Trade'; 
import './Dashboard.css'; 

const Dashboard = ({ onLogout, userId }) => { 
  const [portfolio, setPortfolio] = useState({});
  const [selectedStock, setSelectedStock] = useState(null);
  const [sampleStocks, setSampleStocks] = useState([]);
  const [stockLogos, setStockLogos] = useState({});

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const stocks = [
          { name: "Apple Inc.", symbol: "AAPL", price: 150.00 },
          { name: "Microsoft Corporation", symbol: "MSFT", price: 250.00 },
          { name: "Amazon.com, Inc.", symbol: "AMZN", price: 3300.00 },
          { name: "Tesla, Inc.", symbol: "TSLA", price: 700.00 },
          { name: "Alphabet Inc.", symbol: "GOOGL", price: 2800.00 },
        ];
        setSampleStocks(stocks);
        await fetchStockLogos(stocks);
        await fetchPortfolioData(userId);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchStockLogos = async (stocks) => {
      const logos = {};
      for (const stock of stocks) {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/logo/${stock.symbol}?apikey=3aGPsRwDZEK0UkhHwaV8j25kyFmSTLRw`);
        const data = await response.json();
        if (data.length > 0) {
          logos[stock.symbol] = data[0].url; 
        }
      }
      setStockLogos(logos);
    };

    const fetchPortfolioData = async (userId) => {
      try {
        const response = await fetch(`http://localhost:5000/api/portfolio/${userId}`);
        const data = await response.json();
        const portfolioData = data.reduce((acc, item) => {
          acc[item.symbol] = {
            quantity: item.quantity,
            currentPrice: item.currentPrice,
          };
          return acc;
        }, {});
        setPortfolio(portfolioData);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };

    fetchStockData();
  }, [userId]);

  const handleBuyStock = async (symbol, quantity, currentPrice) => {
    setPortfolio(prevPortfolio => {
      const existingStock = prevPortfolio[symbol];
      const newQuantity = existingStock ? existingStock.quantity + quantity : quantity;
      const updatedPortfolio = {
        ...prevPortfolio,
        [symbol]: {
          quantity: newQuantity,
          currentPrice: currentPrice
        }
      };
      savePortfolioToDatabase(userId, symbol, newQuantity, currentPrice);
      return updatedPortfolio;
    });
  };

  const savePortfolioToDatabase = async (userId, symbol, quantity, currentPrice) => {
    try {
      await fetch('http://localhost:5000/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, symbol, quantity, currentPrice }),
      });
    } catch (error) {
      console.error('Error saving portfolio:', error);
    }
  };

  const handleSelectStock = (stock) => {
    setSelectedStock(stock);
  };

  return (
    <div className="dashboard">
      <h1>Stock Trading Dashboard</h1>
      
      <h2>Available Stocks</h2>
      <div className="stock-list">
        {sampleStocks.map(stock => (
          <div key={stock.symbol} className="stock-card" onClick={() => handleSelectStock(stock)}>
            {stockLogos[stock.symbol] && (
              <img src={stockLogos[stock.symbol]} alt={`${stock.name} logo`} style={{ width: '50px', height: '50px' }} />
            )}
            <h3>{stock.name} ({stock.symbol})</h3>
            <p>Price: ${stock.price}</p>
          </div>
        ))}
      </div>

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
        onClick={onLogout} 
        className="logout-button" 
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;