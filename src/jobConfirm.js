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
        console.log("I am working", this.state);
        event.preventDefault();
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
    <input className="confirmButton" type="submit" value="Corregir"/>
        <Link to = "/"><input className="confirmButton" type="submit"  value="Publicar"/></Link>
</div>
</form>
</div>);
    }
}
