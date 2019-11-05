import React, {Component} from "react";
import { slide as Menu } from 'react-burger-menu';


class Burger extends Component {
    showSettings(event) {
        event.preventDefault();
    }

    render() {
        return (
            <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"}>
                <main id="page-wrap">  
                    <a id="home" className="menu-item" href="/portfolio"><p>Portfolio</p></a>
                    <a id="about" className="menu-item" href="/calendar"><p>Calendar</p></a>
                    <a id="contact" className="menu-item" href="/chat"><p>Chat</p></a>
                    <a onClick={this.showSettings} className="menu-item--small" href="/reports"><p>Reports</p></a>
                </main>
            </Menu>
        );
    }
}

export default Burger;