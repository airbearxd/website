import React from "react";

function Shop({ onClose }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "10vh",
        left: "10vw",
        width: "80vw",
        height: "70vh",
        backgroundColor: "white",
        border: "3px solid #888",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 10px black",
        zIndex: 1000,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          backgroundColor: "#444",
          padding: "0.5em",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
          fontFamily: "'VT323', monospace",
          fontSize: "2vmin",
        }}
      >
        <span>Shop - Aryan</span>
        <button
          onClick={onClose}
          style={{
            backgroundColor: "#ff5555",
            border: "none",
            color: "white",
            fontWeight: "bold",
            fontFamily: "'VT323', monospace",
            cursor: "pointer",
            padding: "0 0.5em",
          }}
        >
          X
        </button>
      </div>

      {/* Content area */}
      <div
        style={{
          padding: "1em",
          overflowY: "auto",
          flexGrow: 1,
          fontFamily: "'VT323', monospace",
          fontSize: "2vmin",
          color: "#000",
        }}
      >
        <h1>Shop</h1>
        <p>Here is where your shop items or Shopify integration will appear.</p>
        {/* Add product images and info here */}
      </div>
    </div>
  );
}

export default Shop;
