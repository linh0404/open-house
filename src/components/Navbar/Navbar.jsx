import React from "react";
import Burger from "./Burger";
import { Link } from "react-router-dom";


function Navbar(props) {
    return (
        <>
        <Burger />
        <nav className="navbar navbar-expand-lg">
            <h1 id="logo">OPEN HOUSE</h1>
            <Link to="/login" className="btn btn-link text-secondary">
                <span className="login">login</span>
            </Link>
            <Link to="/signup" className="btn btn-link">
                <span className="signup">sign up</span>
            </Link>
        </nav>
        </>
    );
}

export default Navbar;