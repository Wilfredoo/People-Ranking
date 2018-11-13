import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

export class JobDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get("/getJobInfo").then(result => {
            this.setState({
                jobData: result.data
            })
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        },() => { console.log("state in handle change: ", this.state);});
    }

    handleSubmit(event) {
        console.log("I am working", this.state);
        event.preventDefault();
    }

    render() {
    if (!this.state.jobData) {
        return null;
    }

        return (
<div>
    <form onSubmit = {this.handleSubmit} >
        <p>Restaurante: {this.state.jobData.data.restname}</p>
        <p>Puesto: {this.state.jobData.data.jobtype}</p>
        <p>Salario: {this.state.jobData.data.hourpay}</p>
        <p>Paga en: {this.state.jobData.data.typepay}</p>
        <p>Horario: {this.state.jobData.data.schedule}</p>
        <p>Direccion: {this.state.jobData.data.address}</p>
        <p>Numero: {this.state.jobData.data.phone}</p>
        <p>Preguntar por: {this.state.jobData.data.contact}</p>
    </form>
</div>);
    }
}
