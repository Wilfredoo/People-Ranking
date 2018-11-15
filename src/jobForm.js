import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

export class JobForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        },() => { console.log("state in handle change: ");});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('/createJob', this.state).then(resp => {
            console.log(this);
            if (resp.data.success) {
            this.props.history.push('/jobConfirm');
        }
        })
    }

    render() {
        return (
<div className="jobForm">
            < form onSubmit = {
            this.handleSubmit
        } >
        <h1>Crear Nuevo Puesto</h1>
        <p className="formQuestions">Como se llama su restaurante?</p>
        <input className="formInputs" type="text" name="restname"  required onChange={this.handleChange}/>

    <p className="formQuestions">Que puesto busca?</p>
        <select className="formInputs" type="text" name="jobtype" required onChange={this.handleChange}>
            <option value=""></option>
            <option value="Line Cook">Line Cook</option>
            <option value="Lavaplatos">Lavaplatos</option>
            <option value="Cocinero">Cocinero</option>
            <option value="Pora">Pora</option>
            <option value="Mesero">Mesero</option>
            <option value="Porter">Porter</option>
            <option value="Otro">Otro</option>
        </select>
        <p className="formQuestions">Cuanto paga la hora?</p>
        <input className="formInputs" type="text" name="hourpay" required onChange={this.handleChange}/>
        <p className="formQuestions">Paga en cheque o cash?</p>
        <span ><label htmlFor="cash">Cash </label><input className="radio" type="radio" name="typepay" value="cash" required onChange={this.handleChange} /></span>
        <span><label onChange={this.handleChange} htmlFor="ambos"> Ambos  </label><input className="radio" type="radio" value="ambos" name="typepay" onChange={this.handleChange} /></span>
        <span><label onChange={this.handleChange} htmlFor="cheque"> Cheque  </label><input className="radio" type="radio" value="cheque" name="typepay" onChange={this.handleChange}/></span>
        <p className="formQuestions">Cual es el horario?</p>
        <input className="formInputs" type="text" name="schedule" required onChange={this.handleChange}/>
        <p className="formQuestions">Direccion del restaurante:</p>
        <input className="formInputs" type="text" name="address"  required onChange={this.handleChange}/>
        <p className="formQuestions">En que area se encuentra?</p>
            <select className="formInputs" type="text" name="area" required onChange={this.handleChange}>
                <option value=""></option>
                <option value="Manhattan">Manhattan</option>
                <option value="Brooklyn">Brooklyn</option>
                <option value="El Bronx">El Bronx</option>
                <option value="Queens">Queens</option>
                <option value="Staten Island">Staten Island</option>
            </select>
        <p className="formQuestions">Numero de celular (opcional)?</p>
        <input className="formInputs" type="number" name="phone" required onChange={this.handleChange}/>
        <p className="formQuestions">Por quien preguntar?</p>
        <input className="formInputs" type="text" name="contact" required onChange={this.handleChange}/>
        <input id="listo" type="submit" value="Listo"/>

    </form>
</div>);
    }
}
