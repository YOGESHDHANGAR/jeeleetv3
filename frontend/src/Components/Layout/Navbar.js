import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <img src={`${process.env.PUBLIC_URL}/jeeLeetLogo.png`} alt="Logo" />
        </div>
        <div className="nav-links">
          <NavLink
            to="/explore"
            className={({ isActive, isPending }) =>
              isPending
                ? "nav-link pending"
                : isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending
                ? "nav-link pending"
                : isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Problems
          </NavLink>
          <NavLink
            to="/contest"
            className={({ isActive, isPending }) =>
              isPending
                ? "nav-link pending"
                : isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Contest
          </NavLink>
          <NavLink
            to="/discuss"
            className={({ isActive, isPending }) =>
              isPending
                ? "nav-link pending"
                : isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Discuss
          </NavLink>
          <NavLink
            to="/interview"
            className={({ isActive, isPending }) =>
              isPending
                ? "nav-link pending"
                : isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Interview
          </NavLink>
          <NavLink
            to="/store"
            className={({ isActive, isPending }) =>
              isPending
                ? "nav-link pending"
                : isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Store
          </NavLink>
        </div>
      </div>
      <div className="navbar-right">
        {/* <div className="auth-links">
          <span>Register</span>
          <span>or</span>
          <span>Sign in</span>
        </div> */}
        <button className="premium-button">Premium</button>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
