import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import Modal from './modal';

export class Jobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        axios.get("/getJobs").then(result => {
            console.log("result in axios /getJobs: ", result.data);
            this.setState({jobData: result.data});
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
        console.log("STATE jobdata in handle click ",this.state.jobData);
        console.log("check this out: ", event);
        this.setState({
            show: true,
            selectedJobId: event
        },
     () => {
        console.log("state is handleclick in jobs", this.state);
    })
    }

    render() {
        if (!this.state.jobData) {
            return null;
        }
        return (
            <div>
                { this.state.show && <Modal id={this.state.selectedJobId}/>}
            <div className="filtersbutton">
                <div className="filters">
                    <form onSubmit={this.handleSubmit}>
                        <select className="filter" type="text" name="jobtype" onChange={this.handleChange}>
                            <option value="">Puesto</option>
                            <option value="Line Cook">Line Cook</option>
                            <option value="Lavaplatos">Lavaplatos</option>
                            <option value="Cocinero">Cocinero</option>
                            <option value="Pora">Pora</option>
                            <option value="Mesero">Mesero</option>
                            <option value="Porter">Porter</option>
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

                <Link to="/jobForm"><input id="createJob" type="submit" value="Crear puesto"/></Link>
            </div>

            <div className="allJobs">
                {
                    this.state.userSelection && this.state.jobData.data.map(data => {
                        if (this.state.userSelection === data.jobtype) {
                            return (

                                <div onClick={e => this.handleClick(data.id)} className="jobData" key={data.id}>
                                    <h3>{data.restname}
                                        <span className="busca"> busca </span>
                                        {data.jobtype}</h3>
                                    <p>Salario: {data.hourpay}$ la hora</p>
                                    <p>Area: {data.area}</p>
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
                                <p>Salario: {data.hourpay}$ la hora</p>
                                <p>Area: {data.area}</p>
                            </div>
                        )
                    })
                }

            </div>
        </div>);
    }
}
