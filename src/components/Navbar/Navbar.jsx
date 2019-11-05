import React from "react";
import Burger from "./Burger";
import { Route, Link } from "react-router-dom";


function Navbar(props) {
    return (
        <>
        <Burger />
        <nav className="navbar navbar-expand-lg">
            <h1 id="logo">OPEN HOUSE</h1>
            <Link to="/login" className="btn btn-link text-secondary">
                <span className="text-secondary">login</span>
            </Link>
            <Link to="/signup" className="btn btn-link">
                <span className="text-secondary">sign up</span>
            </Link>
        </nav>
        </>
    );
}

export default Navbar;