import PropTypes from 'prop-types';
import * as React from "react";
import {ListGroup, ListGroupItem} from "react-bootstrap";

class Groups extends React.Component {

    render() {
        const {groups} = this.props;

        return <ListGroup>
            {groups.map(name => groupItem(name))}
        </ListGroup>
    }

}

function groupItem(name) {
    return <ListGroupItem key={name}>
        {name}
    </ListGroupItem>
}

Groups.propTypes = {
    groups: PropTypes.array
};

Groups.defaultProps = {
    groups: ["A"]
};

export default Groups;