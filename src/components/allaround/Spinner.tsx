import React from "react";

const Spinner: React.FC = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
    <style jsx>{`
      .spinner-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .spinner {
        border: 4px solid rgba(71, 152, 156, 0.2);
        border-top: 4px solid #47989c; /* Adjusted color */
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

export default Spinner;
