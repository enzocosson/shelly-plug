import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

function Header() {
  return (
    <div className={styles.main}>
      <nav className={styles.container__nav}>
        <h1>
          <span>Shelly</span>Board
        </h1>
        {/* <img className={styles.logo} src="/images/shellyboard.png" alt="" /> */}

        <div className={styles.container__profil}>
          <div className={styles.container__img__pp}>
            <img
              className={styles.pp}
              src="/images/pp.jpeg"
              alt="photo de profil"
            />
          </div>

          <div className={styles.profil__name}>Enzo Cosson</div>

          <button className={styles.edit}>Edit</button>
        </div>

        <nav>
          <ul>
            <li>
              <Link className={styles.active} to="/">
                {" "}
                <img src="/images/dashboard.svg" alt="" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/activity">
                {" "}
                <img src="/images/activity.svg" alt="" />
                Activity
              </Link>{" "}
            </li>
            <li>
              <Link to="/schedule">
                {" "}
                <img src="/images/calendrier.svg" alt="" />
                Schedule
              </Link>{" "}
            </li>
            <li>
              <Link to="/contact">
                {" "}
                <img src="/images/settings.svg" alt="" />
                Contact
              </Link>{" "}
            </li>
          </ul>
        </nav>
      </nav>

      <div className={styles.switch}>
        <span>Off</span>
        <input className={`${styles.tgl} ${styles.tgl_ios}`} id="cb2" type="checkbox" />
        <label className={`${styles.tgl_btn}`} htmlFor="cb2"></label>
        <span>On</span>
      </div>
    </div>
  );
}

export default Header;
