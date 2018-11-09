import React from 'react';
import axios from 'axios';
import {Buttons} from './buttons';
import {Detail} from './detail';
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
                <Route exact path="/" component={JobForm}/>
            </div>
        </BrowserRouter>)
    }
}
