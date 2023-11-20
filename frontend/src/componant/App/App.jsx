import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../../componant/Header/Header";
import Home from "../../views/Home/Home";
import Activity from "../../views/Activity/Activity";
import Schedule from "../../views/Schedule/Schedule";
import Contact from "../../views/Contact/Contact";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.main}>
      <div className={styles.container__dashboard}>
  
        <Router>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
