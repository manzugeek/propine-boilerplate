const fetch = require("node-fetch");
const csv = require("csv-parser");
const fs = require("fs");

const CRYPTO_COMPARE_API_KEY = "YOUR_API_KEY_HERE";

const portfolio = {};

const getPrice = async (symbol) => {
  try {
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${CRYPTO_COMPARE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.USD;
  } catch (error) {
    console.error(`Error fetching price for ${symbol}: ${error}`);
    throw error;
  }
};

const calculatePortfolioValue = () => {
  let totalValue = 0;
  for (const [symbol, balance] of Object.entries(portfolio)) {
    totalValue += balance * getPrice(symbol);
  }
  return totalValue;
};

fs.createReadStream("transactions.csv")
  .on("error", (error) => {
    console.error(`Error reading CSV file: ${error}`);
    process.exit(1);
  })
  .pipe(csv())
  .on("data", async (row) => {
    try {
      const { timestamp, transaction_type, token, amount } = row;
      if (transaction_type === "DEPOSIT") {
        if (portfolio[token]) {
          portfolio[token] += parseFloat(amount);
        } else {
          portfolio[token] = parseFloat(amount);
        }
      } else if (transaction_type === "WITHDRAWAL") {
        if (portfolio[token]) {
          portfolio[token] -= parseFloat(amount);
        } else {
          portfolio[token] = -parseFloat(amount);
        }
      }
      const portfolioValue = calculatePortfolioValue();
      console.log(
        `Latest portfolio value of ${token}: ${(
          portfolio[token] * getPrice(token)
        ).toFixed(2)} USD`
      );
      console.log(`Total portfolio value: ${portfolioValue.toFixed(2)} USD`);
    } catch (error) {
      console.error(`Error processing transaction: ${error}`);
    }
  })
  .on("error", (error) => {
    console.error(`Error parsing CSV data: ${error}`);
    process.exit(1);
  })
  .on("end", () => {
    console.log("Portfolio calculation finished.");
  });

