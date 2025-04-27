import React from "react";
import styles from "./Header.module.css";

const items = ["FAQs", "RSVP", "The Venue", "Timeline", "Menu", "Music"];

const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <nav className={`navbar navbar-expand-lg ${styles.nav}`}>
        <div className={`container ${styles.container}`}>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {items.map((item, index) => (
                <li className="nav-item" key={index}>
                  <a
                    className={`nav-link ${styles.navigation}`}
                    href={`#${item.toLowerCase()}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
