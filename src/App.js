import React from 'react';

import './App.css'

import {Redirect, Route, Router, Switch} from 'react-router-dom'
import history from './helpers/history';

import LoadTourney from "./components/LoadTourney";
import SelectionPage from "./components/SelectionPage";

import SingleColumnLayout from "./hoc/SingleColumnLayout";
import NewTourney from "./components/NewTourney";
import Groups from "./components/Groups";
import TourneyState from "./components/TourneyState";
import {saveAs} from 'file-saver';

import uuidv4 from 'uuid/v4';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.addGroup = this.addGroup.bind(this);
        this.pickTourneyName = this.pickTourneyName.bind(this);
        this.addTeam = this.addTeam.bind(this);
        this.approveGroups = this.approveGroups.bind(this);
        this.groupChosen = this.groupChosen.bind(this);
        this.onMatchAdded = this.onMatchAdded.bind(this);
        this.saveTourneyState = this.saveTourneyState.bind(this);
        this.loadTourneyState = this.loadTourneyState.bind(this);
        this.redirectToGroups = this.redirectToGroups.bind(this);
        this.proceedToState = this.proceedToState.bind(this);

        this.state = {
            groups: [
                {groupLetter: "A", teams: [], matches: []}
            ],
            currentlyDisplayedGroup: "A"
        };
    }

    loadTourneyState(history) {
        return state => {
            this.setState(JSON.parse(state));
            this.proceedToState(history)
        }
    }

    saveTourneyState() {
        const blob = new Blob([JSON.stringify(this.state)], {type: "text/plain;charset=utf-8"});
        const fileName = `${this.state.tourneyName ? this.state.tourneyName : 'tourney'}.txt`;
        saveAs(blob, fileName)
    }

    onMatchAdded(groupLetter, firstTeam, secondTeam, sets) {

        // TODO refactor it to a match object
        // TODO think if defined objects help with immutable operations

        const {groups} = this.state;

        const groupIndex = groups.findIndex(group => group.groupLetter === groupLetter);
        const group = groups[groupIndex];

        const newMatches = group.matches.slice();
        newMatches.push({firstTeam: firstTeam, secondTeam: secondTeam, sets: sets, id: uuidv4()});

        const newGroups = [
            ...groups.slice(0, groupIndex),
            {...group, matches: newMatches},
            ...groups.slice(groupIndex + 1,)
        ];

        this.setState({groups: newGroups});
    }

    groupChosen(groupLetter) {
        this.setState({currentlyDisplayedGroup: groupLetter})
    }

    addGroup() {
        let lastGroup = this.state.groups.map(it => it.groupLetter).slice().pop();
        let newGroupLetter = String.fromCharCode(lastGroup.charCodeAt(0) + 1);
        const groups = [...this.state.groups, {groupLetter: newGroupLetter, teams: [], matches: []}];
        this.setState({groups: groups})
    }

    addTeam(groupName, teamName) {
        const group = this.state.groups.find(byName(groupName));

        const newTeams = group.teams.slice();
        newTeams.push(teamName);
        const groupWithAddedTeam = {...group, teams: newTeams};

        const newGroups = this.state.groups.slice();

        const toReplace = newGroups.findIndex(byName(groupName));

        newGroups[toReplace] = groupWithAddedTeam;

        this.setState({groups: newGroups})
    }

    approveGroups(history) {
        return () => this.proceedToState(history);

    }

    proceedToState(history) {
        history.push('/tourney/state')
    }

    pickTourneyName(toruneyName) {
        this.setState({tourneyName: toruneyName});
    }

    createTourneyAndRedirect(history) {
        return (tourneyName) => {
            this.pickTourneyName(tourneyName);
            this.redirectToGroups(history);
        }
    }

    redirectToGroups(history) {
        history.push('/tourney/groups')
    }

    render() {

        return <Router history={history}>
            <div>
                <Switch>
                    <Route path='/tourney/new'
                           render={props => <LayoutNewTourney
                               createNewTourney={this.createTourneyAndRedirect(history)}/>}
                    />
                    <Route path='/tourney/load'
                           render={props =>
                               <LayoutLoadTourney loadTourney={this.loadTourneyState(history)}/>}/>
                    <Route path='/tourney/groups'
                           render={props =>
                               <Groups addGroup={this.addGroup}
                                       tourneyName={this.state.tourneyName}
                                       groups={this.state.groups}
                                       teamAdded={this.addTeam}
                                       approveGroups={this.approveGroups(history)}
                               />
                           }
                    />
                    <Route path='/tourney/state' render={props =>
                        <LayoutTourneyState
                            saveTourneyState={this.saveTourneyState}
                            groups={this.state.groups.map(it => Object.assign({}, {groupLetter: it.groupLetter}))}
                            group={this.state.groups.find(it => it.groupLetter === this.state.currentlyDisplayedGroup)}
                            tourneyName={this.state.tourneyName}
                            groupChosen={this.groupChosen}
                            onMatchAdded={this.onMatchAdded}
                        />}
                    />
                    <Route path='/' component={SingleColumnLayout({Content: SelectionPage})}/>
                    <Redirect from='*' to='/'/>
                </Switch>
            </div>
        </Router>
    }
}

function byName(teamName) {
    return (it) => it.groupLetter === teamName;
}

const LayoutNewTourney = SingleColumnLayout({Content: NewTourney});
const LayoutTourneyState = SingleColumnLayout({Content: TourneyState}, 12, 0);
const LayoutLoadTourney = SingleColumnLayout({Content: LoadTourney}, 12, 0);

export default App;
