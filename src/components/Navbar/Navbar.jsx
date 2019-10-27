import React from "react";

function myFunction(x) {
    x.classList.toggle("change");
    }  

function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg">
            <div class="menu" data-toggle="dropdown" onclick={() => myFunction(this)}>
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
            </div>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" href="/portfolio">Portfolio</a>
                <a class="dropdown-item" href="/calendar">Calendar</a>
                <a class="dropdown-item" href="/correspondance">Correspondance</a>
                <a class="dropdown-item" href="/reports">Reports</a>
            </div>
            <h1 id="logo">OPEN HOUSE</h1>
            <li class="nav-item" id="sign-in">
                <button class="btn btn-link" id="signinbtn" data-toggle="modal" data-target="#signinmodal" href="#">Sign In</button>
                <a href="/logout" class="btn btn-link" id="logoutbtn" href="#">Log Out</a>
            </li>
        </nav>
    );
}

export default Navbar;