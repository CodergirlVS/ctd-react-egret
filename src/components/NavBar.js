import React from "react";
import Logo from "../Images/Logo.png";
import PropTypes from "prop-types";
import styles from "./NavBar.module.css";
import { Link, useLocation } from "react-router-dom";

function Nav({ todoCount, priorityCount }) {
  let location = useLocation();
  const counts = `(${todoCount} - ${priorityCount})`;
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
        <li>
          <i
            class="fa fa-briefcase"
            aria-hidden="true"
            style={{ color: "green" }}
          />
          <Link to="/List1">
            Work
            {location.pathname === "/List1" && (
              <>
                <span class="fa-stack">
                  <span
                    class="fa fa-circle-o fa-stack-1x"
                    style={{
                      color: "green",
                      fontSize: "30px",
                      alignItems: "center",
                    }}
                  ></span>
                  <strong
                    class="fa-stack-1x"
                    style={{ fontSize: "75%", textAlign: "center" }}
                  >
                    {todoCount}
                  </strong>
                </span>

                {/* <span class="fa-stack">
                  <span
                    className={`fa fa-star fa-stack-2x`}
                    style={{
                      color: "yellow",
                    }}
                  ></span>
                  <strong class="fa-stack-1x" style={{ fontSize: "80%" }}>
                    {priorityCount}
                  </strong>
                </span> */}

                <span className="Star1">
                  &#x2605;
                  <span className="StarContent">
                    <span>{priorityCount}</span>
                  </span>
                </span>
              </>
            )}
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
            Personal {location.pathname === "/List2" ? counts : ""}
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
            Volunteer {location.pathname === "/List3" ? counts : ""}
          </Link>
          <span className={styles.Count}></span>
        </li>
      </ul>
    </nav>
  );
}

Nav.propTypes = {
  todoCount: PropTypes.number,
};
export default Nav;
