import PropTypes from 'prop-types';
import 'rc-collapse/assets/index.css';
import React from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Form from "react-bootstrap/es/Form";

class TeamDropdownSelect extends React.Component {

    constructor(props) {
        super(props);

        this.onTeamSelected = this.onTeamSelected.bind(this);
    }

    onTeamSelected(e) {
        const selectedTeam = e.target.value;

        if (selectedTeam !== 'Wybierz drużynę') {
            this.props.onTeamSelected(selectedTeam);
        }

    }

    render() {

        const {problem, teamSelected, onTeamSelected, allTeams} = this.props;

        return <Form.Group>
            <Form.Control as="select"
                          isInvalid={problem}
                          value={teamSelected || 'Wybierz drużynę'}
                          onChange={e => onTeamSelected(e.target.value)}
            >
                {!teamSelected && <option>Wybierz drużynę</option>}
                {allTeams.map(teamName => <Team key={teamName} teamName={teamName}/>)}
            </Form.Control>
            {problem && problem.notSelected && <NotSelectedFeedback/>}
        </Form.Group>
    }

}

function NotSelectedFeedback() {
    return <Form.Control.Feedback type='invalid'>
        Proszę wybrać drużynę
    </Form.Control.Feedback>;
}

TeamDropdownSelect.propTypes = {
    teamSelected: PropTypes.string,
    onTeamSelected: PropTypes.func,
    allTeams: PropTypes.array,
    problems: PropTypes.object
};

TeamDropdownSelect.defaultProps = {
    teamSelected: '',
    onTeamSelected: () => {
    },
    allTeams: [],
    problems: {}
};

function Team({teamName}) {
    return <option>{teamName}</option>
}

export default TeamDropdownSelect;