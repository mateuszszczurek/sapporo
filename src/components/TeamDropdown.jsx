import PropTypes from 'prop-types';
import 'rc-collapse/assets/index.css';
import React from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Dropdown from "react-bootstrap/es/Dropdown";

class TeamDropdown extends React.Component {

    render() {

        const {teamSelected, onTeamSelected, allTeams} = this.props;

        return <Dropdown
            onSelect={onTeamSelected}>
            <Dropdown.Toggle
                className='w-100'>
                {teamSelected ? teamSelected : 'Wybierz drużynę'}
            </Dropdown.Toggle>
            <Dropdown.Menu
                className='w-100'>
                {allTeams.map(teamName => team(teamName))}
            </Dropdown.Menu>
        </Dropdown>
    }

}

TeamDropdown.propTypes = {
    teamSelected : PropTypes.string,
    onTeamSelected : PropTypes.func,
    allTeams : PropTypes.array
};

TeamDropdown.defaultProps = {
    teamSelected : null,
    onTeamSelected : () => {},
    allTeams: []
}

function team(teamName) {
    return <Dropdown.Item key={teamName} eventKey={teamName}>{teamName}</Dropdown.Item>
}

export default TeamDropdown;