import React, {Component} from 'react';

import './App.css'

import {BrowserRouter, Route, Switch} from 'react-router-dom'

import NewTourney from './components/NewTourney'
import LoadTurney from "./components/LoadTourney";
import SelectionPage from "./components/SelectionPage";

class App extends Component {
    render() {
        return <BrowserRouter>
            <div>
                <Switch>
                    <Route path='/tourney/new' component={NewTourney}/>
                    <Route path='/tourney/load' component={LoadTurney}/>
                    <Route path='/' component={SelectionPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    }

}

export default App;
