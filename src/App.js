import React, {Component} from 'react';

import './App.css'

import {Redirect, Route, Router, Switch} from 'react-router-dom'
import history from './helpers/history';

import LoadTourney from "./components/LoadTourney";
import SelectionPage from "./components/SelectionPage";
import Groups from "./components/Groups";

import Layout from "./hoc/Layout";
import NewTourney from "./components/NewTourney";

class App extends Component {

    constructor(props) {
        super(props);

        this.addGroup = this.addGroup.bind(this);

        this.state = {};
    }

    addGroup(newGroup) {
        const groups = this.state.groups ?  [...this.state.groups, newGroup] : [newGroup];
        this.setState({groups: groups})
    }

    addGroupAndRedirect(history) {
        return (newGroup) => {
            this.addGroup(newGroup);
            history.push('/tourney/groups')
        }
    }

    render() {
        return <Router history={history}>
            <div>
                <Switch>
                    <Route path='/tourney/new'
                           render={props =>
                               <LayoutNewTourney createNewTourney={this.addGroupAndRedirect(history)}/>
                           }
                    />
                    <Route path='/tourney/load' component={Layout({Content: LoadTourney})}/>
                    <Route path='/tourney/groups'
                           render={props =>
                               <LayoutGroups groups={this.state.groups}/>
                           }
                    />
                    <Route path='/' component={Layout({Content: SelectionPage})}/>
                    <Redirect from='*' to='/'/>
                </Switch>
            </div>
        </Router>
    }
}

const LayoutNewTourney = Layout({Content: NewTourney});
const LayoutGroups = Layout({Content: Groups});

export default App;
