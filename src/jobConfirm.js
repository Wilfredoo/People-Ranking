import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

export class JobConfirm extends React.Component {
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
        console.log("state in jobconfirm: ", this.state);
        event.preventDefault();
        axios.post('/publishJob', this.state).then(resp => {
            if (resp.data.success) {
                this.props.history.push('/');
                // location.replace('/')
            }
        })
    }


    render() {
    if (!this.state.jobData) {
        return null;
    }

        return (
<div className="jobConfirmPage">
    <form onSubmit = {this.handleSubmit} >

        <h1 className="confirmTitle">Confirme la informacion es correcta:</h1>
        <table>
            <tr>
               <td className="confirmText">Restaurante:</td>
               <td className="confirmText">{this.state.jobData.data.restname}</td>
             </tr>
             <tr>
               <td className="confirmText">Puesto:</td>
               <td className="confirmText">{this.state.jobData.data.jobtype}</td>
             </tr>
             <tr>
               <td className="confirmText">Salario:</td>
               <td className="confirmText">{this.state.jobData.data.hourpay}</td>
             </tr>
             <tr>
               <td className="confirmText">Paga en:</td>
               <td className="confirmText">{this.state.jobData.data.typepay}</td>
             </tr>
             <tr>
               <td className="confirmText">Horario:</td>
               <td className="confirmText">{this.state.jobData.data.schedule}</td>
             </tr>
             <tr>
               <td className="confirmText">Direccion:</td>
               <td className="confirmText">{this.state.jobData.data.address}</td>
             </tr>
             <tr>
               <td className="confirmText">Numero:</td>
               <td className="confirmText">{this.state.jobData.data.phone}</td>
             </tr>
             <tr>
               <td className="confirmText">Preguntar por:</td>
               <td className="confirmText">{this.state.jobData.data.contact}</td>
             </tr>
         </table>

    <div className="confirmButtons">
    <Link to = "/jobForm"><input className="confirmButton" type="submit" value="Corregir"/></Link>
        <Link to = "/"><input onClick={this.handleSubmit} className="confirmButton" type="submit"  value="Publicar"/></Link>
</div>
</form>
</div>);
    }
}
