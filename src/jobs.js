import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import Modal from './modal';
import Moment from 'react-moment';
import 'moment/locale/es';

export class Jobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentDidMount() {
        axios.get("/getJobs").then(result => {
            this.setState({jobData: result.data});
        });

        axios.get("/getDate").then(result => {
            this.setState({dateData: result.data});
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            userSelection: event.target.value
        }, () => {
            console.log("state in handle change: ", this.state);
        })
    }

    handleSubmit(event) {
        location.replace('/jobForm')
    }

    handleClick(event) {
        this.setState({
            show: true,
            selectedJobId: event
        },
     () => {
    })
    }

    hideModal() {
        this.setState({show: false}, () => {
        });
    }

    render() {
        if (!this.state.jobData) {
            return null;
        }
        return (
            <div>
            <h1>JobDirecto - Trabajos en NYC - Yeah</h1>

                { this.state.show && <Modal id={this.state.selectedJobId} close={this.hideModal}/>}
            <div className="filtersbutton">
                <div className="filters">
                    <form onSubmit={this.handleSubmit}>
                        <select className="filter" type="text" name="jobtype" onChange={this.handleChange}>
                            <option value="">Puesto</option>
                            <option value="Lavaplatos">Lavaplatos</option>
                            <option value="Cocinero">Cocinero</option>
                            <option value="Line Cook">Line Cook</option>
                            <option value="Busboy">Busboy</option>
                            <option value="Delivery Boy">Delivery Boy</option>


                            <option value="Deliman">Deliman</option>
                            <option value="Otro">Otro</option>
                        </select>
                        <select className="filter" type="text" name="area" onChange={this.handleChange}>
                            <option value="">Area</option>
                            <option value="Manhattan">Manhattan</option>
                            <option value="Brooklyn">Brooklyn</option>
                            <option value="Queens">Queens</option>
                            <option value="El Bronx">El Bronx</option>
                            <option value="Staten Island">Staten Island</option>
                        </select>
                    </form>
                </div>

                <Link to="/jobForm"><input id="createJob" type="submit" value="Busco Personal"/></Link>
            </div>

            <div className="allJobs">
                {
                    this.state.userSelection && this.state.jobData.data.map(data => {
                        if (this.state.userSelection === data.jobtype || this.state.userSelection === data.area) {
                            return (

                                <div onClick={e => this.handleClick(data.id)} className="jobData" key={data.id}>
                                    <h3>{data.restname}
                                        <span className="busca"> busca </span>
                                        {data.jobtype}</h3>

                                    <p>Area: {data.area}</p>
                                    <div className="jobMoment"><Moment fromNow>{data.created_at}</Moment></div>
                                </div>
                            )
                        }
                    })
                }

                {
                    !this.state.userSelection && this.state.jobData.data.map(data => {
                        return (
                            <div onClick={e => this.handleClick(data.id)} className="jobData" key={data.id}>
                                <h3>{data.restname}
                                    <span className="busca"> busca </span>
                                    {data.jobtype}</h3>
                                <p>Area: {data.area}</p>
                                <div className="jobMoment"><Moment fromNow>{data.created_at}</Moment></div>
                            </div>
                        )
                    })
                }

            </div>
        </div>);
    }
}
