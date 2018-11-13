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
<div>
            < form onSubmit = {
            this.handleSubmit
        } >

        <p>Como se llama su restaurante?</p>
        <input type="text" name="restname"  required onChange={this.handleChange}/>

    <p>Que puesto busca?</p>
        <select type="text" name="jobtype" required onChange={this.handleChange}>
            <option value=""></option>
            <option value="Line Cook">Line Cook</option>
            <option value="Lavaplatos">Lavaplatos</option>
            <option value="Cocinero">Cocinero</option>
            <option value="Pora">Pora</option>
            <option value="Mesero">Mesero</option>
            <option value="Porter">Porter</option>
            <option value="Otro">Otro</option>
        </select>
        <p>Cuanto paga la hora?</p>
        <input type="text" name="hourpay" required onChange={this.handleChange}/>
        <p>Paga en cheque o cash?</p>
        <span><label htmlFor="cash">Cash</label><input type="radio" name="typepay" value="cash" required onChange={this.handleChange} /></span>
        <span><label onChange={this.handleChange} htmlFor="ambos">Ambos</label><input type="radio" value="ambos" name="typepay" onChange={this.handleChange} /></span>
        <span><label onChange={this.handleChange} htmlFor="cheque">Cheque</label><input type="radio" value="cheque" name="typepay" onChange={this.handleChange}/></span>
        <p>Cual es el horario?</p>
        <input type="text" name="schedule" required onChange={this.handleChange}/>
        <p>Direccion del restaurante:</p>
        <input type="text" name="address"  required onChange={this.handleChange}/>
        <p>Numero de celular (opcional)?</p>
        <input type="number" name="phone" required onChange={this.handleChange}/>
        <p>Por quien preguntar?</p>
        <input type="text" name="contact" required onChange={this.handleChange}/>
        <input type="submit" value="Finalizar"/>

    </form>
</div>);
    }
}
