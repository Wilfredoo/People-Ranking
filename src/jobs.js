import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/es';

export class Jobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    componentDidMount() {
      console.log("look at me");
        axios.get("/getJobs").then(result => {

                    this.setState({jobData: result.data});

        });


    }



    render() {

        return (
            <div className="bg">
                <h1>PuaRanking - A modest list</h1>

            </div>
        );
    }
}
