import PropTypes from 'prop-types';
import * as React from "react";
import {Nav, Navbar} from "react-bootstrap";
import Form from "react-bootstrap/es/Form";
import Button from "react-bootstrap/es/Button";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import TourneyDetails from "./TourneyDetails";

class TourneyState extends React.Component {

    render() {

        const {saveTourneyState, groupChosen, tourneyName, group, groups} = this.props;

        return <div>
            <Row>
                <Col md={{span: 8}}>
                    <h3 className='pb-3'>Turniej "{tourneyName}"</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Navbar bg="primary"
                            variant="dark"
                            onSelect={groupChosen}
                    >
                        <Nav className="mr-auto">
                            <GroupItems activeGroup={group.groupLetter}
                                        groups={groups}
                            />
                        </Nav>
                        <Form inline>
                            <Button
                                onClick={saveTourneyState}
                                variant="outline-light">Zapisz turniej</Button>
                        </Form>
                    </Navbar>
                </Col>
            </Row>
            <Row>
                <Col md={12} className='mb-3'>
                    <TourneyDetails group={group} onMatchAdded={this.props.onMatchAdded}/>
                </Col>
            </Row>
        </div>
    }
}

function GroupItems({activeGroup, groups}) {
    return groups.map(it =>
        <Nav.Link eventKey={it.groupLetter}
                  key={it.groupLetter}
                  active={it.groupLetter === activeGroup}
        >
            Grupa {it.groupLetter}
        </Nav.Link>
    )
}

TourneyState.propTypes = {
    groups: PropTypes.array.isRequired,
    group: PropTypes.object,
    tourneyName: PropTypes.string,
    groupChosen: PropTypes.func,
    onMatchAdded: PropTypes.func,
    saveTourneyState : PropTypes.func
};

TourneyState.defaultProps = {
    groups: [],
    tourneyName: "Nazwa turnieju",
    group: {},
    groupChosen: () => {
    }
};

export default TourneyState;