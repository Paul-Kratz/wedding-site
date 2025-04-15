import React from "react";
import Image from "next/image";
import styles from "./BackgroundImage.module.css";

const BackgroundImage = () => {
  return (
    <>
      <Image
        src="/bg.webp"
        alt="Background"
        fill
        priority
        className={styles.backgroundImage}
        quality={100}
      />
      <div className={styles.overlay} aria-hidden="true" />
    </>
  );
};

export default BackgroundImage;
