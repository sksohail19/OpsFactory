// src/components/SplashScreen.js
import React from "react";

const SplashScreen = () => {
  return (
    <div style={styles.container}>
      <img src="./assets/logo.png" alt="Logo" style={styles.logo} />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#ffffff", // optional background
  },
  logo: {
    width: "150px", // adjust as needed
    height: "auto",
  },
};

export default SplashScreen;
