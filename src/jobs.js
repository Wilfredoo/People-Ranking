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
        this.handleChangeJob = this.handleChangeJob.bind(this);
        this.handleChangeArea = this.handleChangeArea.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentDidMount() {
        axios.get("/getJobs").then(result => {
            for (var i = 0; i < result.data.data.length; i++) {
                if(result.data.data[i].jobtype !== "Otro") {
                    result.data.data[i].otro_job = false;
                    this.setState({jobData: result.data});
                } else if (result.data.data[i].jobtype === "Otro") {
                    result.data.data[i].jobtype = result.data.data[i].otro_desc;
                    result.data.data[i].otro_job = true;
                    this.setState({jobData: result.data});
                }
                console.log("state:", this.state.jobData);
            }
        });

        axios.get("/getDate").then(result => {
            this.setState({dateData: result.data});
        });
    }

    handleChangeJob(event) {
        this.setState({
            [event.target.name]: event.target.value,
            userSelectionJob: event.target.value
        })

    }

    handleChangeArea(event) {
        this.setState({
            [event.target.name]: event.target.value,
            userSelectionArea: event.target.value
        })
    }

    handleSubmit(event) {
        location.replace('/jobForm')
    }

    handleClick(event) {
        this.setState({
            show: true,
            selectedJobId: event
        })
    }

    hideModal() {
        this.setState({show: false});
    }

    render() {
        if (!this.state.jobData) {
            return null;
        }
        return (
            <div className="bg">
                <h1>JobDirecto - Trabajos en NYC</h1>
                { this.state.show && <Modal id={this.state.selectedJobId} close={this.hideModal}/>}
                <div className="filtersbutton">
                    <div className="filters">
                        <form onSubmit={this.handleSubmit}>
                            <select className="filter" type="text" name="jobtype" onChange={this.handleChangeJob}>
                                <option value="">Puesto</option>
                                <option value="Lavaplatos">Lavaplatos</option>
                                <option value="Cocinero">Cocinero</option>
                                <option value="Line Cook">Line Cook</option>
                                <option value="Busboy">Busboy</option>
                                <option value="Delivery Boy">Delivery Boy</option>
                                <option value="Deliman">Deliman</option>
                                <option value="Otro">Otro</option>
                            </select>
                            <select className="filter" type="text" name="area" onChange={this.handleChangeArea}>
                                <option value="">Area</option>
                                <option value="Manhattan">Manhattan</option>
                                <option value="Brooklyn">Brooklyn</option>
                                <option value="Queens">Queens</option>
                                <option value="El Bronx">El Bronx</option>
                                <option value="Staten Island">Staten Island</option>
                            </select>
                        </form>
                    </div>
                    <Link to="/jobForm"><input id="createJob" type="submit" value="Publicar Anuncio"/></Link>
                </div>

                <div className="allJobs">

                    {
                        this.state.userSelectionJob && !this.state.userSelectionArea && this.state.jobData.data.map(data => {
                            if (this.state.userSelectionJob === data.jobtype && !data.otro_job) {
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
                        this.state.userSelectionJob && !this.state.userSelectionArea && this.state.jobData.data.map(data => {
                            if (this.state.userSelectionJob === "Otro" && data.otro_job) {
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
                        !this.state.userSelectionJob && this.state.userSelectionArea && this.state.jobData.data.map(data => {
                            if (this.state.userSelectionArea === data.area) {
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
                        this.state.userSelectionJob && this.state.userSelectionArea && this.state.jobData.data.map(data => {
                            if (this.state.userSelectionJob === data.jobtype && this.state.userSelectionArea === data.area) {
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
                        this.state.userSelectionJob && this.state.userSelectionArea && this.state.jobData.data.map(data => {
                            if (this.state.userSelectionJob === "Otro" && data.otro_job && this.state.userSelectionArea === data.area) {
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
                        !this.state.userSelectionJob && !this.state.userSelectionArea && this.state.jobData.data.map(data => {
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
            </div>
        );
    }
}
