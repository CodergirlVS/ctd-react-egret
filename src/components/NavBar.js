import React from "react";
import Logo from "../Images/Logo.png";
import PropTypes from "prop-types";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as Star } from "../Images/StarButton.svg";

function Nav({
  workCount,
  personalCount,
  volunteerCount,
  workPriorityCount,
  personalPriorityCount,
  volunteerPriorityCount,
}) {
  return (
    <nav className={styles.NavBar}>
      <img className={styles.Logo} src={Logo} alt="Logo" />
      <ul className={styles.Ul}>
        <li className={styles.Menu}>
          <i class="fa fa-bars" aria-hidden="true"></i>
          <ul className={styles.SubMenu}>
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
                />
              </Link>
            </li>
            <li>
              <i
                class="fa fa-briefcase"
                aria-hidden="true"
                style={{ color: "green" }}
              />
              <Link to="/List1">
                Work ({workCount}){" "}
                {workPriorityCount > 0 ? <Star className={styles.Star1} /> : ""}
              </Link>
            </li>
            <li>
              <i
                class="fa fa-user"
                aria-hidden="true"
                style={{ color: "blue" }}
              ></i>
              <Link to="/List2">
                Personal ({personalCount}){" "}
                {personalPriorityCount > 0 ? (
                  <Star className={styles.Star1} />
                ) : (
                  ""
                )}
              </Link>
            </li>
            <li>
              <i
                class="fa fa-heart"
                aria-hidden="true"
                style={{ color: "#fa3983" }}
              ></i>
              <Link to="/List3">
                Volunteer ({volunteerCount}){" "}
                {volunteerPriorityCount > 0 ? (
                  <Star className={styles.Star1} />
                ) : (
                  ""
                )}{" "}
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

Nav.propTypes = {
  todoCount: PropTypes.number,
};
export default Nav;
