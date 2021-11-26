import React, { useContext } from "react";
import Logo from "../Images/Logo.png";
import PropTypes from "prop-types";
import styles from "./NavBar.module.css";
import { Link, useLocation } from "react-router-dom";

function Nav({ todoCount }) {
  let location = useLocation();
  return (
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
        {/* <li>
          <i
            class="fa fa-exclamation"
            aria-hidden="true"
            style={{ color: "red" }}
          ></i>
          Important
        </li> */}
        <li>
          <i
            class="fa fa-briefcase"
            aria-hidden="true"
            style={{ color: "green" }}
          ></i>
          <Link to="/List1">
            Work {location.pathname === "/List1" ? "(" + todoCount + ")" : ""}
          </Link>
          <span className={styles.Count}></span>
        </li>
        <li>
          <i
            class="fa fa-user"
            aria-hidden="true"
            style={{ color: "blue" }}
          ></i>
          <Link to="/List2">
            Personal{" "}
            {location.pathname === "/List2" ? "(" + todoCount + ")" : ""}
          </Link>
          <span className={styles.Count}></span>
        </li>
        <li>
          <i
            class="fa fa-heart"
            aria-hidden="true"
            style={{ color: "#fa3983" }}
          ></i>
          <Link to="/List3">
            Volunteer{" "}
            {location.pathname === "/List3" ? "(" + todoCount + ")" : ""}
          </Link>
          <span className={styles.Count}></span>
        </li>
      </ul>
    </nav>
  );
}

Nav.propTypes = {
  todoCount: PropTypes.array,
};
export default Nav;
