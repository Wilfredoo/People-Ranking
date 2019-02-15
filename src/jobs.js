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
            // for (var i = 0; i < result.data.data.length; i++) {
            //     if(result.data.data[i].jobtype !== "Otro") {
            //         result.data.data[i].otro_job = false;
                    this.setState({jobData: result.data});
            //     } else if (result.data.data[i].jobtype === "Otro") {
            //         result.data.data[i].jobtype = result.data.data[i].otro_desc;
            //         result.data.data[i].otro_job = true;
            //         this.setState({jobData: result.data});
            //     }
            // }
        });


    }



    // <h3>{data.restname}
    //     <span className="busca"> busca </span>
    //     {data.jobtype}</h3>

    render() {

        return (
            <div className="bg">
                <h1>JobDirecto - Trabajos en NYC</h1>

            </div>
        );
    }
}
