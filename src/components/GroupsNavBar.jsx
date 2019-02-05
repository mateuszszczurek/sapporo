import * as React from "react";
import {Nav, Navbar} from "react-bootstrap";
import NavLink from "react-router-dom/es/NavLink";

class GroupsNavBar extends React.Component {

    render() {
        // TODO save tourney button here
        return <Navbar>
            <Nav className="mr-auto">
                <NavLink href="#home">Home</NavLink>
                <NavLink href="#link">Link</NavLink>
            </Nav>
            <Navbar/>

        </Navbar>
    }

}

export default GroupsNavBar;