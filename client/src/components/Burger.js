import React, { Component } from "react";
import { stack as Menu } from 'react-burger-menu';


class Burger extends Component {
    showSettings(event) {
        event.preventDefault();
    }

    render() {
        return (
            <Menu>
                <a id="portfolio" className="menu-item" href="/profile"><p><i class="fas fa-book"></i>Portfolio</p></a>
                <a id="calendar" className="menu-item" href="/calendar"><p><i class="fas fa-calendar-alt"></i>Calendar</p></a>
                <a id="chat" className="menu-item" href="/chat"><p><i class="fas fa-comment-alt"></i>Chat</p></a>
                <a id="reports" className="menu-item" href="/reports"><p><i class="fas fa-chart-line"></i>Reports</p></a>
                <a id="settings" className="menu-item" href="/settings"><p><i class="fas fa-cogs"></i>Settings</p></a>
                <a id="contact" className="menu-item" href="/contact"><p><i class="fas fa-id-card"></i>Contact Us</p></a>
            </Menu>
        );
    }
}

export default Burger;