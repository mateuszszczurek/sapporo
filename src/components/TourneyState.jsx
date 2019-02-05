import PropTypes from 'prop-types';
import * as React from "react";
import {Nav, Navbar} from "react-bootstrap";
import Form from "react-bootstrap/es/Form";
import Button from "react-bootstrap/es/Button";

class TourneyState extends React.Component {

    render() {
        // TODO save tourney button here
        return <Navbar bg="primary" variant="dark">
            <Nav className="mr-auto">
                <GroupItems groups={this.props.groups}/>
            </Nav>
            <Form inline>
                <Button variant="outline-light">Zapisz turniej</Button>
            </Form>
        </Navbar>
    }
}

function GroupItems({groups}) {
    return groups.map(it=> <Nav.Link key={it.groupLetter}>Grupa {it.groupLetter}</Nav.Link>)
}

TourneyState.propTypes = {
    groups: PropTypes.array.isRequired
};

TourneyState.defaultProps = {
    groups: []
};

export default TourneyState;