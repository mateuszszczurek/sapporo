import PropTypes from 'prop-types';

import React from 'react'
import {Col, Grid, Row} from "react-bootstrap";
import Logo from "./Logo";
import Group from "./Group";
import Button from "react-bootstrap/es/Button";
import Glyphicon from "react-bootstrap/es/Glyphicon";

// TODO extract this css (is copied from other file)
// TODO bigger space between plus and text
// TODO try to bettern align 'dodaj grupę' button
const spaceBetweenFormInputs = {marginBottom: '10px'};

function fourGroups(groups, teamAdded, from = 0, to = 4) {
    return groups.slice(from, to).map(group =>
        <Col key={group.groupLetter} sm={3}>
            <Group
                groupLetter={group.groupLetter}
                teams={group.teams}
                teamAdded={teamAdded}/>
        </Col>);
}

class Groups extends React.Component {

    render() {

        const {groups, teamAdded} = this.props;

        console.log(groups);


        const amountOfGroups = groups.length;
        return <Grid>
            <Row>
                <Col sm={8} smOffset={2}>
                    <Logo/>
                </Col>
            </Row>
            <Row>
                {fourGroups(groups, teamAdded)}
                {amountOfGroups < 4 && addGroup(this.props.addGroup)}
            </Row>
            <Row>
                {fourGroups(groups, teamAdded, 4, 8)}
                {(amountOfGroups >= 4 && amountOfGroups < 8) && addGroup(this.props.addGroup)}
            </Row>
        </Grid>
    }

}

function addGroup(groupAdded) {
    return <Col sm={3}>
        <Button style={{marginTop: '20px'}} onClick={groupAdded}>
            <Glyphicon glyph='plus'/>
            <span style={spaceBetweenFormInputs}>Dodaj grupę</span>
        </Button>
    </Col>

}

Groups.propTypes = {
    groups: PropTypes.array,
    addGroup: PropTypes.func,
    tourneyName: PropTypes.string
};

Group.defaultProps = {
    tourneyName: 'Turniej',
    groups: [],
    addGroup: () => null
};

export default Groups;