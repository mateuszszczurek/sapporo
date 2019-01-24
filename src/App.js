import React, {Component} from 'react';

import './App.css'

import {BrowserRouter, Route, Switch} from 'react-router-dom'

import NewTourney from './NewTourney'
import SelectionPage from "./SelectionPage";

class App extends Component {
    render() {
        return <BrowserRouter>
            <div>
                <Switch>
                    <Route path='/tourney/new' component={NewTourney}/>
                    <Route path='/tourney/load' component={NewTourney}/>
                    <Route path='/' component={SelectionPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    }

}

export default App;
