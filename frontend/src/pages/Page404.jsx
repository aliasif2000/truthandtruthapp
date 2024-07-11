import React from "react";

const Page404 = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404 - Page Not Found</h1>
      <p style={styles.text}>Oops! The page you are looking for does not exist.</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    color: "#343a40",
    textAlign: "center"
  },
  header: {
    fontSize: "48px",
    marginBottom: "20px"
  },
  text: {
    fontSize: "18px"
  }
};

export default Page404;
