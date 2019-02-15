import React from 'react';
import axios from 'axios';
import {JobConfirm} from './jobConfirm.js';
import {JobForm} from './jobForm.js';
import {Jobs} from './jobs.js';
import {BrowserRouter, Route} from 'react-router-dom'
import ReactGA from 'react-ga';

function initializeReactGA() {
    ReactGA.initialize('UA-129656531-1');
    ReactGA.pageview('/homepage');
}

export class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact="exact" path="/" component={Jobs}/>
                </div>
            </BrowserRouter>
        )
    }
}
