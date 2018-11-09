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
        });
    }

    handleSubmit(event) {
        console.log("I am working", this.state);
        event.preventDefault();
        axios.post('/createJob', this.state).then(resp => {
            location.replace('/')
        })
    }

    render() {

        return (
<div>
            < form onSubmit = {
            this.handleSubmit
        } >

        <p>Como se llama su restaurante?</p>
        <input type="text" name="restname"  onChange={this.handleChange}/>

    <p>Que puesto busca?</p>
        <select name="jobtype" onChange={this.handleChange}>
            <option >Line Cook</option>
            <option >Lavaplatos</option>
            <option >Cocinero</option>
            <option >Pora</option>
            <option >Mesero</option>
            <option >Porter</option>
            <option >Otro</option>
        </select>

        <p>Cuanto paga la hora?</p>
        <input type="text" name="hourpay" onChange={this.handleChange}/>

        <p>Paga en cheque o cash?</p>

        <span><label   htmlFor="cash">Cash</label><input type="radio" name="typepay" value="cash" onChange={this.handleChange} /></span>
        <span><label onChange={this.handleChange} htmlFor="ambos">Ambos</label><input type="radio" value="ambos" name="typepay" onChange={this.handleChange} /></span>
        <span><label onChange={this.handleChange} htmlFor="cheque">Cheque</label><input type="radio" value="cheque" name="typepay" onChange={this.handleChange}/></span>

    <p>Direccion del restaurante:</p>
        <input type="text" name="address"  onChange={this.handleChange}/>
        <p>Numero de celular (opcional)?</p>
        <input type="number" name="phone" onChange={this.handleChange}/>

        <p>Por quien preguntar?</p>
        <input type="text" name="contact"  onChange={this.handleChange}/>

        <input type="submit" value="Finalizar"/>

    </form>
</div>);
    }
}
