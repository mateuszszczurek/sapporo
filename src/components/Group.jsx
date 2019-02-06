import PropTypes from 'prop-types';
import * as React from "react";
import {Button, Form, FormControl, FormGroup} from "react-bootstrap";

import '../css/button.css';
import {FaPlus} from "react-icons/fa/index";

class Group extends React.Component {

    constructor(props) {
        super(props);

        this.addTeam = this.addTeam.bind(this);
        this.newTeamNameChange = this.newTeamNameChange.bind(this);
        this.teamAdded = this.teamAdded.bind(this);
        this.newTeamOnEnter = this.newTeamOnEnter.bind(this);

        this.state = {newTeamName: '', teamNameWarning: ''}
    }

    newTeamNameChange(e) {
        this.setState({newTeamName: e.target.value});
    }

    teamAdded() {
        const newTeamName = this.state.newTeamName;
        if(!newTeamName || newTeamName.trim().length === 0) {
            // this.setState({teamNameWarning: 'Nazwa drużyny nie może być pusta!'})
            // TODO add sensible message
            // TODO only unique team names!
        } else if (this.props.teams.includes(newTeamName)){
            // this.setState({teamNameWarning: 'Istnieje już drużyna o takiej nazwie!'})
        } else {
            this.props.teamAdded(this.props.groupLetter, this.state.newTeamName);
            this.setState({newTeamName: ''})
        }
    }

    newTeamOnEnter(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.teamAdded()
        }
    }

    addTeam() {
        return <div>
            <FormControl value={this.state.newTeamName}
                         className='mb-2'
                         key='newItem'
                         onChange={this.newTeamNameChange}
                         onKeyPress={this.newTeamOnEnter}
            />
            <Button onClick={this.teamAdded} >
                <FaPlus  />
                <span>Dodaj drużynę</span>
            </Button>
        </div>
    }


    render() {
        const {groupLetter, teams, teamAdded} = this.props;

        return <div>
            <h2>{groupLetter}</h2>
            <Form>
                <FormGroup
                    controlId={groupLetter}>
                    {groupItems(teams, groupLetter)}
                    {teams && teams.length < 8 && this.addTeam(groupLetter, teamAdded)}
                </FormGroup>
            </Form>
        </div>
    }

}

function groupItems(teams) {
    return teams.map(name => teamItem(name));
}

function teamItem(name) {
    return <FormControl readOnly style={{marginBottom: '10px'}} key={name} value={name}/>

}

Group.propTypes = {
    groupLetter: PropTypes.string,
    teams: PropTypes.array,
    teamAdded: PropTypes.func
};

Group.defaultProps = {
    groupLetter: 'A',
    groups: [],
    teamAdded: () => null
};

export default Group;