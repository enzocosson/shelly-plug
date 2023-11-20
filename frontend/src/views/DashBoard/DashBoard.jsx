// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import styles from './DashBoard.module.scss'
import Header from '../../componant/Header/Header'


function Dashboard() {


  return (
    <>
      <div className={styles.main}>
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default Dashboard
