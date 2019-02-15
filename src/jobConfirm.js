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
//heyhey
    componentDidMount() {
        axios.get("/getJobInfo").then(result => {
            if (result.data.success == false) {
                return null;
            }
            if(result.data.data.otro_desc === "") {
                result.data.data.otro_desc = result.data.data.jobtype;
                this.setState({
                    jobData: result.data
                })
            } else {
                this.setState({
                    jobData: result.data
                })
            }
            console.log(result.data);
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('/publishJob', this.state).then(resp => {
            if (resp.data.success) {
                this.setState({
                    jobData: ''
                })
                this.props.history.push('/');
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
                        { this.state.jobData.data.jobtype !== "Otro" &&
                         <tr>
                           <td className="confirmText">Puesto:</td>
                           <td className="confirmText">{this.state.jobData.data.jobtype}</td>
                         </tr>
                        }
                        { this.state.jobData.data.jobtype === "Otro" &&
                         <tr>
                           <td className="confirmText">Puesto:</td>
                           <td className="confirmText">{this.state.jobData.data.otro_desc}</td>
                         </tr>
                        }
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
                         <tr>
                           <td className="confirmText">Mas informacion:</td>
                           <td className="confirmText">{this.state.jobData.data.extrainfo}</td>
                         </tr>
                    </table>
                    <div className="confirmButtons">
                        <Link to = "/jobForm"><input className="confirmButton" type="submit" value="Corregir"/></Link>
                        <Link to = "/"><input onClick={this.handleSubmit} className="confirmButton" type="submit"  value="Publicar"/></Link>
                    </div>
                </form>
            </div>
        );
    }
}
