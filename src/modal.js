import React from 'react';
import axios from 'axios';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    componentDidMount() {
        axios.get("/getJobDetails/" + this.props.id).then(result => {
            this.setState({
                jobData: result.data
            }, () => {
            })
        });
    }

    render() {
        if (!this.state.jobData) {
            return null;
        }
        return (<div>

            <main className="modal">
                <table>
                    <tr>
                        <td className="confirmText">Restaurante:</td>
                        <td className="confirmText">{this.state.jobData.data.restname}</td>
                        <button onClick={this.props.close} class="btn">
                            <i class="fa fa-close"></i>
                        </button>
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
            </main>
        </div>)
    }
}
