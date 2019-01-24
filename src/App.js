import React, {Component} from 'react';

import './App.css'

import {BrowserRouter, Route} from 'react-router-dom'

import NewTourney from './NewTourney'
import SelectionPage from "./SelectionPage";

class App extends Component {
    render() {
        return <BrowserRouter>
            <div>
                <Route path='/home' component={SelectionPage}/>
                <Route path='/tourney/new' component={NewTourney}/>
                <Route path='/tourney/load' component={NewTourney}/>
            </div>
        </BrowserRouter>
    }

}

export default App;
