import PropTypes from 'prop-types';
import 'rc-collapse/assets/index.css';
import React from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Row from "react-bootstrap/es/Row";
import {Col} from "react-bootstrap";
import Button from "react-bootstrap/es/Button";
import TeamDropdown from "./TeamDropdown";
import Set from "./Set";

class AddMatch extends React.Component {

    // TODO - add version number
    // TODO - empty groups are not displayed and considered
    // TODO - remove duplication for dropdowns
    // TODO - shouldn't be able to select same team
    // TODO refactor and numbers only
    // TODO handle switching on 'same-selection'
    // TODO validate that inputs are numbers!

    constructor(props) {
        super(props);

        this.state = {teamsSelection: [], sets: {}};

        this.firstTeamSelected = this.firstTeamSelected.bind(this);
        this.secondTeamSelected = this.secondTeamSelected.bind(this);
        this.onTeamSelected = this.onTeamSelected.bind(this);
        this.teamSelectionFor = this.teamSelectionFor.bind(this);
        this.sameItemSelected = this.sameItemSelected.bind(this);
        this.onMatchAdded = this.onMatchAdded.bind(this);
        this.onSetChanged = this.onSetChanged.bind(this);
    }

    onSetChanged(setNumber, selectionId) {
        return value => {
            const set = Object.assign({}, {
                ...this.state.sets[setNumber],
                [selectionId]: value
            });
            const newSets = Object.assign({}, {...this.state.sets});
            newSets[setNumber] = set;
            this.setState({sets: newSets});
        }
    }

    onMatchAdded() {
        if (this.state.teamsSelection.length < 2) {
            alert('Proszę wybrać obie drużyny');
            // consider disabling button if two teams are not chosen
            // todo - check if at least on set populated
            // todo - check if we don't have unfilled sets
            // todo - check if we have draws
            return;
        }

        const setsValidation = Object.keys(this.state.sets).map(key => validateSet(key, this.state.sets[key]));

        if (setsValidation.filter(it => it.validation) > 0) {
            this.setState({validationResults: setsValidation, creationAttempted: true});
            return;
        }

        const firstTeam = this.state.teamsSelection[0].selectedTeam;
        const secondTeam = this.state.teamsSelection[1].selectedTeam;

        // TODO shouldn't be able to add match without any sets!
        // TODO flush state from set - make selection - unselected
        // TODO Make it possible to edit match or forbid to choose already chosen match
        this.props.onMatchAdded(firstTeam, secondTeam, this.state.sets);
        this.setState({sets: [], teamsSelection: [], creationAttempted: false})
    }

    teamSelectionFor(selectionId) {
        const selection = this.state.teamsSelection.find(it => it.selectionId === selectionId);
        if (!selection) {
            return "";
        } else {
            return selection.selectedTeam;
        }
    }

    onTeamSelected(selectionId) {
        return selectedTeam => {
            if (this.state.teamsSelection.findIndex(it => it.selectedTeam === selectedTeam) !== -1) {
                return;
            }
            const newSelection = {selectionId: selectionId, selectedTeam: selectedTeam};

            const newSelections = this.state.teamsSelection.filter(it => it.selectionId !== selectionId);
            newSelections.push(newSelection);

            this.setState({teamsSelection: newSelections});
        }
    }

    sameItemSelected(index, selectedTeam) {
        return this.state.teamsSelection[index].selectedTeam === selectedTeam;
    }

    firstTeamSelected(eventKey) {
        this.setState({firstTeamSelected: eventKey});
    }

    secondTeamSelected(eventKey) {
        this.setState({secondTeamSelected: eventKey});
    }

    render() {

        const {group} = this.props;

        return <div>
            <Row className={'mb-2'}>
                <Col md={{span: 4, offset: 1}}>
                    <TeamDropdown
                        allTeams={group.teams}
                        teamSelected={this.teamSelectionFor('first-team')}
                        onTeamSelected={this.onTeamSelected('first-team')}
                    />
                </Col>
                <Col md={2}>
                    <h3 className='text-center'>vs</h3>
                </Col>
                <Col md={4}>
                    <TeamDropdown
                        allTeams={group.teams}
                        teamSelected={this.teamSelectionFor('second-team')}
                        onTeamSelected={this.onTeamSelected('second-team')}
                    />
                </Col>
            </Row>
            {Array.from(new Array(5), (val, index) => index + 1).map(setNumber =>
                <Set key={setNumber}
                     setNumber={setNumber}
                     firstTeam={'first-team'}
                     secondTeam={'second-team'}
                     creationAttempted={this.state.creationAttempted}
                     firstTeamResult={this.state.sets[setNumber] ? this.state.sets[setNumber]['first-team'] : null}
                     secondTeamResult={this.state.sets[setNumber] ? this.state.sets[setNumber]['second-team'] : null}
                     onSetChange={this.onSetChanged}/>
            )}
            <Row className={'mt-3'}>
                <Col>
                    <Button
                        onClick={this.onMatchAdded}
                        className='float-right'
                        type="submit">Zatwierdź mecz
                    </Button>
                </Col>
            </Row>
        </div>
    }

}

function validateSet(setNumber, setResults) {
    const firstResult = setResults['first-team'];
    const secondResult = setResults['second-team'];

    const validationResults = {setNumber: setNumber};

    if (firstResult === 0) {
        validationResults.firstResultsMissing = true;
        validationResults.hasValidationResults = true;
    }

    if (secondResult === 0) {
        validationResults.secondResultMissing = true;
        validationResults.hasValidationResults = true;
    }

    if (!firstResult && !secondResult) {
        validationResults.hasValidationResults = false;
        return validationResults;
    }

    if (firstResult === secondResult) {
        validationResults.isDraw = true;
        validationResults.hasValidationResults = true;
    }

    if (!firstResult) {
        validationResults.firstResultsMissing = true;
    }

    if(!secondResult) {
        validationResults.secondResultMissing = true;
    }

    return validationResults;

}

AddMatch.propTypes = {

    group: PropTypes.object.isRequired

};

export default AddMatch;