import React, { useState, useEffect } from "react";
import "./index.css"; 
import desktopBg from "./desktop-bg.png";
import shopIcon from "./icons/shop.png";
import galleryIcon from "./icons/gallery.png";
import aboutIcon from "./icons/about.png";
import contactIcon from "./icons/contact.png";
import subscribeIcon from "./icons/subscribe.png";
import Contact from "./Contact";
import emailjs from "@emailjs/browser";

const icons = [
  { name: "Shop", icon: shopIcon, link: "/shop" },
  { name: "Gallery", icon: galleryIcon, link: "/gallery" },
  { name: "About", icon: aboutIcon, link: "/about" },
  { name: "Contact", icon: contactIcon, link: "/contact" },
  { name: "Subscribe", icon: subscribeIcon, link: "/subscribe" },
];

const ICON_SIZE_VW = 10;
const ICON_SIZE_VH = 10;
const LABEL_HEIGHT_VH = 8; 
const TASKBAR_HEIGHT_VH = 7;

const generatePositions = (numIcons) => {
  const positions = [];

  const isOverlapping = (top, left) => {
    return positions.some(
      (pos) =>
        Math.abs(pos.top - top) < ICON_SIZE_VH + LABEL_HEIGHT_VH &&
        Math.abs(pos.left - left) < ICON_SIZE_VW
    );
  };

  for (let i = 0; i < numIcons; i++) {
    let top, left;
    let attempts = 0;

    do {
      top = Math.random() * (100 - TASKBAR_HEIGHT_VH - ICON_SIZE_VH - LABEL_HEIGHT_VH);
      left = Math.random() * (100 - ICON_SIZE_VW);
      attempts++;
      if (attempts > 1000) break;
    } while (isOverlapping(top, left));

    positions.push({ top, left });
  }

  return positions;
};

function App() {
  const [positions] = useState(generatePositions(icons.length));
  const [time, setTime] = useState(new Date());

  // Browser window states
  const [showAbout, setShowAbout] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);

  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeSent, setSubscribeSent] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  const formatDate = (date) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const handleIconClick = (name) => {
    switch (name) {
      case "About": setShowAbout(true); break;
      case "Gallery": setShowGallery(true); break;
      case "Shop": setShowShop(true); break;
      case "Contact": setShowContact(true); break;
      case "Subscribe": setShowSubscribe(true); break;
      default: break;
    }
  };

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    if (!subscribeEmail) return;

    const templateParams = {
      subscriber_email: subscribeEmail,
      to_email: "aryandeol2@gmail.com",
    };

    emailjs.send(
      "service_80robec",   // EmailJS service ID
      "template_ksp1cjo",  // EmailJS template ID
      templateParams,
      "W0nyt83jblQEgsMCL"  // EmailJS public key
    )
    .then((response) => {
      console.log("SUCCESS!", response.status, response.text);
      setSubscribeSent(true);
      setSubscribeEmail("");
    })
    .catch((err) => {
      console.error("FAILED TO SEND EMAIL:", err);
      alert("Failed to send email. Check your EmailJS setup.");
    });
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${desktopBg})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Desktop icons */}
      {icons.map((item, i) => {
        const pos = positions[i];
        return (
          <div
            key={i}
            onClick={() => handleIconClick(item.name)}
            style={{
              position: "absolute",
              top: `${pos.top}vh`,
              left: `${pos.left}vw`,
              textDecoration: "none",
              color: "white",
              textAlign: "center",
              cursor: "pointer",
              display: "inline-block",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={item.icon}
              alt={item.name}
              style={{
                width: `${ICON_SIZE_VW}vmin`,
                height: "auto",
                marginBottom: "1vmin",
                filter: "drop-shadow(0 0 3px rgba(0,0,0,0.7))",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                fontFamily: "'VT323', monospace",
                fontSize: "2.5vmin",
                textShadow: "1px 1px 2px black",
                letterSpacing: "0.05em",
                pointerEvents: "none",
              }}
            >
              {item.name}
            </div>
          </div>
        );
      })}

      {/* Taskbar icons */}
      <div
        style={{
          position: "absolute",
          bottom: "1.6vh",
          left: "14vw",
          display: "flex",
          alignItems: "center",
          zIndex: 500,
          transformOrigin: "left bottom",
        }}
      >
        {icons.map((item, i) => (
          <div
            key={i}
            onClick={() => handleIconClick(item.name)}
            style={{
              width: "6vmin",
              height: "6vmin",
              marginRight: "1.5vmin",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={item.icon}
              alt={item.name}
              style={{
                width: "100%",
                height: "auto",
                filter: "drop-shadow(0 0 3px black)",
                pointerEvents: "none",
              }}
            />
          </div>
        ))}
      </div>

      {/* Live time and date */}
      <div
        style={{
          position: "absolute",
          bottom: "1.5vh",
          right: "4.2vw",
          fontFamily: "'VT323', monospace",
          fontSize: "4vmin",
          color: "white",
          textShadow: "1px 1px 2px black",
          textAlign: "right",
          maxWidth: "10vw",
          whiteSpace: "nowrap"
        }}
      >
        <div>{formatTime(time)}</div>
        <div style={{ fontSize: "3vmin" }}>{formatDate(time)}</div>
      </div>

      {/* Browser windows */}
      {showAbout && (
        <div
          style={{
            position: "absolute",
            top: "10vh",
            left: "15vw",
            width: "70vw",
            height: "70vh",
            backgroundColor: "#222",
            border: "3px solid #888",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 0 10px black",
            zIndex: 1000,
          }}
        >
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
            <span>About - Aryan</span>
            <button
              onClick={() => setShowAbout(false)}
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
          <div
            style={{
              padding: "1em",
              overflowY: "auto",
              flexGrow: 1,
              color: "white",
              fontFamily: "'VT323', monospace",
              fontSize: "2vmin",
            }}
          >
            <h1>About</h1>
            <p>Coming Soon.</p>
          </div>
        </div>
      )}

      {showGallery && (
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
            <span>Gallery - Aryan</span>
            <button
              onClick={() => setShowGallery(false)}
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
            <h1>Gallery</h1>
            <p>Coming Soon.</p>
          </div>
        </div>
      )}

      {showShop && (
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
              onClick={() => setShowShop(false)}
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
            <p>Coming Soon.</p>
          </div>
        </div>
      )}

      {showContact && <Contact onClose={() => setShowContact(false)} />}

      {/* Subscribe popup */}
      {showSubscribe && (
        <div
          style={{
            position: "absolute",
            top: "20vh",
            left: "35vw",
            width: "30vw",
            backgroundColor: "#c8c2c2b0",
            border: "3px solid #888",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 0 10px black",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          {/* Full-width top bar */}
          <div
            style={{
              width: "calc(100% + 6px)",
              marginLeft: "-3px",
              backgroundColor: "#444",
              padding: "0.5em",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "white",
              fontFamily: "'VT323', monospace",
              fontSize: "2vmin",
              boxSizing: "border-box",
            }}
          >
            <span>Subscribe - Aryan</span>
            <button
              onClick={() => {
                setShowSubscribe(false);
                setSubscribeSent(false);
                setSubscribeEmail(""); 
              }}
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

          {/* Content */}
          <div
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: "2vmin",
              color: "#000",
              padding: "2em",
            }}
          >
            <p>Join the mailing list to receive updates and more!</p>
            <form onSubmit={handleSubscribeSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.5em",
                  fontFamily: "'VT323', monospace",
                  marginBottom: "1em",
                }}
              />
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
              {subscribeSent && (
                <span style={{ color: "green", marginLeft: "1em", fontWeight: "bold" }}>
                  Thank you!
                </span>
              )}
            </form>
            <p style={{ fontSize: "1.5vmin", marginTop: "1em" }}>
              *I understand that I can opt out at any moment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;