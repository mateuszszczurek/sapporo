import PropTypes from 'prop-types';
import 'rc-collapse/assets/index.css';
import React from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Row from "react-bootstrap/es/Row";
import {Col} from "react-bootstrap";
import Button from "react-bootstrap/es/Button";
import Set from "./Set";
import {validateSets} from "../helpers/validate";
import Form from "react-bootstrap/es/Form";
import TeamDropdownSelect from "./TeamDropdownSelect";

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

        this.state = {teamsSelection: [], sets: {}, validationResults: {}, selectionProblems: {}};

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
            const selection = this.state.teamsSelection.find(it => it.selectionId === 'first-team');

            const selectionProblems = {...this.state.selectionProblems};
            if (!selection) {
                selectionProblems['first-team'] = {notSelected: true};
            }
            const secondSelection = this.state.teamsSelection.find(it => it.selectionId === 'second-team');
            if (!secondSelection) {
                selectionProblems['second-team'] = {notSelected: true};
            }
            // todo - check if we don't have unfilled sets
            // todo - check if we have draws
            this.setState({selectionProblems: selectionProblems});
            return;
        }

        const validationResults = validateSets(this.state.sets);

        if (Object.keys(validationResults).length > 0) {
            this.setState({validationResults: validationResults, creationAttempted: true});
            return;
        }

        const firstTeam = this.state.teamsSelection[0].selectedTeam;
        const secondTeam = this.state.teamsSelection[1].selectedTeam;

        // TODO flush state from set - make selection - unselected
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
            const alreadySelectedIndex = this.state.teamsSelection.findIndex(it => it.selectedTeam === selectedTeam);
            if (alreadySelectedIndex !== -1) {

                const alreadySelected = this.state.teamsSelection[alreadySelectedIndex];
                const toBeChanged = this.state.teamsSelection.find(it => it.selectionId === selectionId);

                const newSelection = [
                    {selectionId: selectionId, selectedTeam: selectedTeam},
                ];

                if(toBeChanged) newSelection.push({selectionId: alreadySelected.selectionId, selectedTeam: toBeChanged.selectedTeam});
                
                this.setState({teamsSelection: newSelection, selectionProblems : {}});
            } else {
                const newSelection = {selectionId: selectionId, selectedTeam: selectedTeam};

                const newSelections = this.state.teamsSelection.filter(it => it.selectionId !== selectionId);
                newSelections.push(newSelection);

                const selectionProblems = {...this.state.selectionProblems};
                selectionProblems[selectionId] = null;

                this.setState({teamsSelection: newSelections, selectionProblems : selectionProblems});
            }
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

        return <Form>
            <Form.Row>
                <Col md={{span: 4, offset: 1}}>
                    <TeamDropdownSelect
                        allTeams={group.teams}
                        problem={this.state.selectionProblems['first-team']}
                        teamSelected={this.teamSelectionFor('first-team')}
                        onTeamSelected={this.onTeamSelected('first-team')}
                    />
                </Col>
                <Col md={2}>
                    <h3 className='text-center'>vs</h3>
                </Col>
                <Col md={4}>
                    <TeamDropdownSelect
                        allTeams={group.teams}
                        problem={this.state.selectionProblems['second-team']}
                        teamSelected={this.teamSelectionFor('second-team')}
                        onTeamSelected={this.onTeamSelected('second-team')}
                    />
                </Col>
            </Form.Row>
            {Array.from(new Array(5), (val, index) => index + 1).map(setNumber =>
                <Set key={setNumber}
                     setNumber={setNumber}
                     firstTeam={'first-team'}
                     secondTeam={'second-team'}
                     creationAttempted={this.state.creationAttempted}
                     firstTeamResult={this.state.sets[setNumber] ? this.state.sets[setNumber]['first-team'] : null}
                     secondTeamResult={this.state.sets[setNumber] ? this.state.sets[setNumber]['second-team'] : null}
                     onSetChange={this.onSetChanged}
                     validationResult={this.state.validationResults[setNumber]}/>
            )}
            <Row className={'mt-3'}>
                <Col>
                    <Button
                        onClick={e => {
                            e.preventDefault();
                            this.onMatchAdded()
                        }}
                        className='float-right'
                        type="submit">Zatwierdź mecz
                    </Button>
                </Col>
            </Row>
        </Form>
    }

}

AddMatch.propTypes = {

    group: PropTypes.object.isRequired

};

export default AddMatch;