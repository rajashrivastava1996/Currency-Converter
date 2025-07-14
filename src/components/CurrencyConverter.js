import React, { useState, useEffect } from "react";
import {
  Select,
  InputNumber,
  Typography,
  Card,
  Row,
  Col,
  Button,
  Divider,
  Switch,
} from "antd";
import { fetchExchangeRates } from "../services/currencyService";
import ErrorMessage from "./ErrorMessage";
import { SyncOutlined, BulbOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const { Option } = Select;
const { Title, Text } = Typography;

const CurrencyConverter = ({ isDarkMode, setIsDarkMode }) => {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState("");
  const [exchangeRates, setExchangeRates] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExchangeRates("USD")
      .then((data) => setExchangeRates(data))
      .catch((error) => setError(error.message));
  }, []);

  const handleConvert = async () => {
    if (!fromCurrency || !toCurrency || !amount) {
      setError("Please fill in all fields.");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const response = await fetchExchangeRates(fromCurrency);
      const rate = response.rates[toCurrency];
      const converted = amount * rate;
      setConvertedAmount(converted.toFixed(2));
    } catch (error) {
      setError("Conversion failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const cardStyles = {
    backgroundColor: isDarkMode ? "#1f1f1f" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#000000",
    boxShadow: isDarkMode
      ? "0 8px 16px rgba(255,255,255,0.1)"
      : "0 8px 16px rgba(0,0,0,0.15)",
  };

  const textColor = isDarkMode ? "#ffffff" : "#32477E";

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        style={{
          maxWidth: 500,
          margin: "auto",
          borderRadius: 12,
          ...cardStyles,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title level={4} style={{ color: textColor }}>
            Currency Converter
          </Title>
          <Switch
            checkedChildren={<BulbOutlined />}
            unCheckedChildren={<BulbOutlined />}
            onChange={(checked) => setIsDarkMode(checked)}
            checked={isDarkMode}
            title="Toggle Theme"
          />
        </div>

        <Divider style={{ borderColor: isDarkMode ? "#555" : "#ddd" }} />

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <label style={{ color: textColor }}>From</label>
            <Select
              showSearch
              placeholder="From"
              value={fromCurrency}
              onChange={(value) => setFromCurrency(value)}
              style={{ width: "100%" }}
            >
              {exchangeRates &&
                Object.keys(exchangeRates.rates).map((currency) => (
                  <Option key={currency} value={currency}>
                    {currency}
                  </Option>
                ))}
            </Select>
          </Col>
          <Col span={12}>
            <label style={{ color: textColor }}>To</label>
            <Select
              showSearch
              placeholder="To"
              value={toCurrency}
              onChange={(value) => setToCurrency(value)}
              style={{ width: "100%" }}
            >
              {exchangeRates &&
                Object.keys(exchangeRates.rates).map((currency) => (
                  <Option key={currency} value={currency}>
                    {currency}
                  </Option>
                ))}
            </Select>
          </Col>
        </Row>

        <div style={{ marginTop: 20 }}>
          <label style={{ color: textColor }}>Amount</label>
          <InputNumber
            min={1}
            value={amount}
            onChange={(value) => setAmount(value)}
            style={{ width: "100%" }}
          />
        </div>

        <Button
          type="primary"
          onClick={handleConvert}
          block
          size="large"
          style={{
            marginTop: 24,
            backgroundColor: "#32477E",
            border: "none",
          }}
          icon={<SyncOutlined />}
          loading={loading}
        >
          Convert
        </Button>

        <Divider style={{ borderColor: isDarkMode ? "#555" : "#ddd" }} />

        {convertedAmount && !loading && (
          <Text style={{ fontSize: 18, color: textColor }}>
            💱 {amount} {fromCurrency} ={" "}
            <strong style={{ color: "#1890ff" }}>
              {convertedAmount} {toCurrency}
            </strong>
          </Text>
        )}

        {error && (
          <div style={{ marginTop: 10 }}>
            <ErrorMessage message={error} />
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default CurrencyConverter;
