import React from 'react';
import axios from 'axios';
import {JobConfirm} from './jobConfirm.js';
import {JobForm} from './jobForm';
import {Jobs} from './jobs';
import {BrowserRouter, Route} from 'react-router-dom'

export class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<BrowserRouter>
            <div>
                <Route exact="exact" path="/jobform" component={JobForm}/>
                <Route exact="exact" path="/" component={Jobs}/>
                <Route exact="exact" path="/jobConfirm" component={JobConfirm}/>
                <Route path = "/job/:id" render = {props => (<JobDetails {...props} key = {props.match.url} /> )} />
        </div>
        </BrowserRouter>)
    }
}
