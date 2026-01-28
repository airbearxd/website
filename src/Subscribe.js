import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Subscribe({ onClose }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      subscriber_email: email,
      to_email: "aryandeol2@gmail.com",
    };

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setSent(true);
          setEmail("");
        },
        (err) => {
          console.error("FAILED...", err);
        }
      );
  };

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
        <span>Subscribe - Aryan</span>
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
        <h1>Subscribe</h1>
        <p>Join for Updates!</p>
        <p style={{ fontSize: "1.5vmin" }}>
          *I understand that I can opt out at any moment.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "60%",
              padding: "0.5em",
              fontFamily: "'VT323', monospace",
              marginBottom: "1em",
            }}
            required
          />
          <br />
          <button
            type="submit"
            style={{
              padding: "0.5em 1em",
              fontFamily: "'VT323', monospace",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
          {sent && (
            <span style={{ color: "green", marginLeft: "1em", fontWeight: "bold" }}>
              Sent ✔
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
