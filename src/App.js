import React, { useState } from "react";
import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const appStyle = {
    backgroundColor: isDarkMode ? "#121212" : "#f0f2f5",
    minHeight: "100vh",
    padding: "40px 16px",
    transition: "background-color 0.3s ease",
    position: "relative",
  };

  const footerStyle = {
    position: "fixed",
    bottom: "10px",
    right: "15px",
    color: isDarkMode ? "#aaa" : "#333",
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: "sans-serif",
    opacity: 0.7,
  };

  return (
    <div className="App" style={appStyle}>
      <CurrencyConverter
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <div style={footerStyle}>
        Created by <strong>Raja Shrivastava</strong>
      </div>
    </div>
  );
}

export default App;
