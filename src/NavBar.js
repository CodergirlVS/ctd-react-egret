import React, { useContext } from "react";
import Logo from "./Images/Logo.png";
import styles from "./NavBar.module.css";
import { BrowserRouter, Link } from "react-router-dom";
import Counter from "./Counter.js";

function Nav() {
  const { count, increment } = useContext(Counter);
  console.log("Work:" + count.Work);

  return (
    <BrowserRouter>
      <nav className={styles.NavBar}>
        <img className={styles.Logo} src={Logo} alt="Logo" />
        <ul className={styles.List}>
          <li>
            <Link to="/">
              <i
                class="fa fa-home"
                aria-hidden="true"
                style={{
                  color: "brown",
                  fontSize: "30px",
                  textAlign: "center",
                }}
              ></i>
            </Link>
          </li>
          <li>
            <i
              class="fa fa-exclamation"
              aria-hidden="true"
              style={{ color: "red" }}
            ></i>
            Important
          </li>
          <li>
            <i
              class="fa fa-briefcase"
              aria-hidden="true"
              style={{ color: "green" }}
            ></i>
            <Link to="/List1">Work</Link>
            <span className={styles.Count}>{count.Work}</span>
          </li>
          <li>
            <i
              class="fa fa-user"
              aria-hidden="true"
              style={{ color: "blue" }}
            ></i>
            <Link to="/List2">Personal</Link>
            <span className={styles.Count}>{count.Personal}</span>
          </li>
          <li>
            <i
              class="fa fa-heart"
              aria-hidden="true"
              style={{ color: "#fa3983" }}
            ></i>
            <Link to="/List3">Volunteer</Link>
            <span className={styles.Count}>{count.Volunteer}</span>
          </li>
        </ul>
      </nav>
    </BrowserRouter>
  );
}
export default Nav;
