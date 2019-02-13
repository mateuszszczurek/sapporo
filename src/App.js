import React, {Component} from 'react';

import './App.css'

import {Redirect, Route, Router, Switch} from 'react-router-dom'
import history from './helpers/history';

import LoadTourney from "./components/LoadTourney";
import SelectionPage from "./components/SelectionPage";

import SingleColumnLayout from "./hoc/SingleColumnLayout";
import NewTourney from "./components/NewTourney";
import Groups from "./components/Groups";
import TourneyState from "./components/TourneyState";

class App extends Component {

    constructor(props) {
        super(props);

        this.addGroup = this.addGroup.bind(this);
        this.pickTourneyName = this.pickTourneyName.bind(this);
        this.addTeam = this.addTeam.bind(this);
        this.approveGroups = this.approveGroups.bind(this);
        this.groupChosen = this.groupChosen.bind(this);
        this.onMatchAdded = this.onMatchAdded.bind(this);

        this.state = {
            groups: [
                {groupLetter: "A", teams: []}
            ],
            matches : [],
            currentlyDisplayedGroup : "A"
        };
    }

    onMatchAdded(firstTeam, secondTeam, sets) {
        const matches = this.state.matches.slice();
        matches.push({firstTeam : firstTeam, secondTeam : secondTeam, sets : sets});
        this.setState({matches : matches})
    }

    groupChosen(groupLetter) {
        this.setState({currentlyDisplayedGroup : groupLetter})
    }

    addGroup() {
        let lastGroup = this.state.groups.map(it => it.groupLetter).slice().pop();
        let newGroupLetter = String.fromCharCode(lastGroup.charCodeAt(0) + 1);
        const groups = [...this.state.groups, {groupLetter: newGroupLetter, teams: []}];
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
        return () => {
            history.push('/tourney/state')
        }
    }

    pickTourneyName(toruneyName) {
        this.setState({tourneyName: toruneyName});
    }

    createTourneyAndRedirect(history) {
        return (tourneyName) => {
            this.pickTourneyName(tourneyName);
            history.push('/tourney/groups')
        }
    }

    render() {

        return <Router history={history}>
            <div>
                <Switch>
                    <Route path='/tourney/new'
                           render={props =>
                               <LayoutNewTourney createNewTourney={this.createTourneyAndRedirect(history)}/>
                           }
                    />
                    <Route path='/tourney/load' component={SingleColumnLayout({Content: LoadTourney})}/>
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
                            groups={this.state.groups.map(it => Object.assign({}, {groupLetter : it.groupLetter}))}
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

export default App;
