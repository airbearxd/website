import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      to_email: process.env.REACT_APP_CONTACT_EMAIL,
    };

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID_CONTACT,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setSent(true);
          setName("");
          setEmail("");
          setMessage("");
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
        <span>Contact - Aryan</span>
        <button
          onClick={onClose}
          style={{
            backgroundColor: "#ff0000ff",
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

      {/* Form area */}
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
        <h1>Send a Message!</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1em" }}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "60%", padding: "0.5em", fontFamily: "'VT323', monospace" }}
              required
            />
          </div>
          <div style={{ marginBottom: "1em" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "60%", padding: "0.5em", fontFamily: "'VT323', monospace" }}
              required
            />
          </div>
          <div style={{ marginBottom: "1em" }}>
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: "60%",
                height: "6em",
                padding: "0.5em",
                fontFamily: "'VT323', monospace",
                resize: "none",
              }}
              required
            />
          </div>
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
