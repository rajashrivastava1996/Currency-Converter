import React from "react";

// ErrorMessage functional component
const ErrorMessage = ({ message }) => {
  return (
    // Render a div with inline style to set text color to red
    <div style={{ color: "red" }}>
      <p>Error: {message}</p>
    </div>
  );
};
// Export the ErrorMessage component as default
export default ErrorMessage;
