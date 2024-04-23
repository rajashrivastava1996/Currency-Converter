import React, { useState, useEffect } from "react";
import { Select, Input, Typography } from "antd";
import { fetchExchangeRates } from "../services/currencyService"; // Custom function to fetch exchange rates
import ErrorMessage from "./ErrorMessage"; // Custom error message component

const { Option } = Select;
const { Text } = Typography;

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState(""); // Currency to convert from
  const [toCurrency, setToCurrency] = useState(""); // Currency to convert to
  const [amount, setAmount] = useState(""); // Amount to convert
  const [convertedAmount, setConvertedAmount] = useState(""); // Converted amount
  const [exchangeRates, setExchangeRates] = useState(null); // Exchange rates data
  const [error, setError] = useState(null); // Error message
  // Fetch exchange rates when component mounts, default base currency is USD
  useEffect(() => {
    fetchExchangeRates("USD") // Default base currency is USD
      .then((data) => setExchangeRates(data))
      .catch((error) => setError(error.message));
  }, []);

  const handleCurrencyChange = (value, type) => {
    if (type === "from") {
      setFromCurrency(value);
    } else {
      setToCurrency(value);
    }
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleConvert = async () => {
    try {
      const response = await fetchExchangeRates(fromCurrency);
      const rate = response.rates[toCurrency];
      const converted = amount * rate;
      setConvertedAmount(converted.toFixed(2));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "5px solid #32477E",
        borderRadius: "10px",
        padding: "20px",
        maxWidth: "400px",
        margin: "auto",
        marginTop: "20px",
      }}
    >
      <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
        Currency Converter
      </h1>
      <label style={{ width: "100%", marginBottom: "5px" }}>
        Choose Currency
      </label>
      <Select
        value={fromCurrency}
        onChange={(value) => handleCurrencyChange(value, "from")}
        style={{ width: "100%", marginBottom: "10px" }}
      >
        {exchangeRates &&
          Object.keys(exchangeRates.rates).map((currency) => (
            <Option key={currency} value={currency}>
              {currency}
            </Option>
          ))}
      </Select>
      <label style={{ width: "100%", marginBottom: "5px" }}>Enter Amount</label>

      <Input
        type="number"
        value={amount}
        onChange={(e) => handleAmountChange(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label style={{ width: "100%", marginBottom: "5px" }}>
        Convert Currency
      </label>
      <Select
        value={toCurrency}
        onChange={(value) => handleCurrencyChange(value, "to")}
        style={{ width: "100%", marginBottom: "10px" }}
      >
        {exchangeRates &&
          Object.keys(exchangeRates.rates).map((currency) => (
            <Option key={currency} value={currency}>
              {currency}
            </Option>
          ))}
      </Select>

      <button
        onClick={handleConvert}
        style={{
          width: "100%",
          marginBottom: "10px",
          height: "37px",
          fontWeight: "bold",
        }}
      >
        Convert
      </button>
      {convertedAmount && (
        <Text style={{ fontSize: "20px", fontWeight: "500" }}>
          Result:{" "}
          {`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`}
        </Text>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default CurrencyConverter;
