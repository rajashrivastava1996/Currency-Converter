// This code defines a function named fetchExchangeRates that fetches exchange rates for a given base currency from an external API.
// The API URL is set to "https://api.exchangerate-api.com/v4/latest".
// It uses the axios library for making HTTP requests.
import axios from "axios";

// Constant defining the base URL of the exchange rate API
const API_URL = "https://api.exchangerate-api.com/v4/latest";

// Function to fetch exchange rates for a given base currency
export const fetchExchangeRates = async (baseCurrency) => {
  // Making a GET request to the API with the specified base currency
  try {
    const response = await axios.get(`${API_URL}/${baseCurrency}`);
    // Returning the response data containing exchange rates
    return response.data;
  } catch (error) {
    // Throwing an error if fetching exchange rates fails
    throw new Error("Failed to fetch exchange rates.");
  }
};
