import PropTypes from 'prop-types';

import React from 'react'
import {Col, Container, Row} from "react-bootstrap";
import Logo from "./Logo";
import Group from "./Group";
import Button from "react-bootstrap/es/Button";
import {FaPlus} from "react-icons/fa/index";
import TourneyName from "./TourneyName";

// TODO extract this css (is copied from other file)
// TODO bigger space between plus and text
// TODO try to better align 'dodaj grupę' button
// TODO check that there is at least one group with at least two teams

function fourGroups(groups, teamAdded) {
    return groups.map(group =>
        <Col key={group.groupLetter} sm={3}>
            <Group
                groupLetter={group.groupLetter}
                teams={group.teams}
                teamAdded={teamAdded}/>
        </Col>);
}

class Groups extends React.Component {

    constructor(props) {
        super(props);

        this.approveGroups = this.approveGroups.bind(this);
    }

    approveGroups() {
        this.props.approveGroups();
    }

    render() {

        const {groups, teamAdded, tourneyName} = this.props;

        const amountOfGroups = groups.length;
        return <Container>
            <Row>
                <Col md={{span: 8, offset: 2}}>
                    <Logo/>
                </Col>
            </Row>
            <Row>
                <Col md={{span: 8}}>
                   <TourneyName tourneyName={tourneyName}/>
                </Col>
            </Row>
            <Row>
                {fourGroups(groups, teamAdded)}
                {(amountOfGroups < 8) && addGroup(this.props.addGroup)}
            </Row>
            <Row>
                <Col md={3}>
                    <Button block onClick={this.approveGroups}>Zatwierdź grupy</Button>
                </Col>
            </Row>
        </Container>
    }

}

function addGroup(groupAdded) {
    return <Col sm={3}>
        <Button className='mb-3' onClick={groupAdded}>
            <FaPlus/>
            <span>Dodaj grupę</span>
        </Button>
    </Col>

}

Groups.propTypes = {
    groups: PropTypes.array,
    addGroup: PropTypes.func,
    tourneyName: PropTypes.string,
    approveGroups: PropTypes.func
};

Group.defaultProps = {
    tourneyName: 'Turniej',
    groups: [],
    addGroup: () => null,
    approveGroups: () => null,
};

export default Groups;