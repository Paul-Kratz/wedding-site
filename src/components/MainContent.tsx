import React from "react";
import BackgroundImage from "./BackgroundImage/BackgroundImage";
import Header from "./Header/Header";
import CoupleName from "./CoupleName/CoupleName";
import styles from "./MainContent.module.css";

const MainContent = () => {
  return (
    <div className={styles.container}>
      <BackgroundImage />
      <div className={styles.innerContainer}>
        <Header />
        <main className={styles.main}>
          <CoupleName />
        </main>
      </div>
    </div>
  );
};

export default MainContent;
