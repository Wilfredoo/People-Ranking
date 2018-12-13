import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

export class JobForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            whatever: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.submision = this.submision.bind(this);

    }

    componentDidMount() {

        axios.get("/getJobforCorrect").then(result => {
            this.setState({
                jobData: result.data,
                restname: result.data.data.restname,
                jobtype: result.data.data.jobtype,
                typepay: result.data.data.typepay,
                area: result.data.data.area,
                hourpay: result.data.data.hourpay,
                schedule: result.data.data.schedule,
                address: result.data.data.address,
                phone: result.data.data.phone,
                contact: result.data.data.contact
            }, () => {
                console.log("state in componentDidMount: ", this.state);
            })

        });

    }

    submision() {
        if (this.state.jobtype === "Otro") {
            this.setState({jobtype: this.state.whatever})
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            console.log("state in handle change: ", this.state);
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("this is my state right before I post: ", this.state);
        axios.post('/finalizeJob', this.state).then(resp => {
            this.props.history.push('/jobConfirm');
            if (resp.data.success) {}
        })
    }

    render() {

        return (<div className="jobForm">
            < form onSubmit={this.handleSubmit
}>
                <h1>Crear Nuevo Puesto</h1>
                <p className="formQuestions">Como se llama su local?</p>

                <input className="formInputs" type="text" name="restname" defaultValue={this.state.jobData && this.state.jobData.data
                        ? this.state.jobData.data.restname
                        : ''} required="required" onChange={this.handleChange}/>}

                <p className="formQuestions">Que posicion busca?</p>
                <select className="formInputs" type="text" name="jobtype" defaultValue={this.state.jobData && this.state.jobData.data
                        ? this.state.jobData.data.jobtype
                        : ''} required="required" onChange={this.handleChange}>
                    <option value=""></option>
                    <option selected={this.state.jobData && this.state.jobData.data && this.state.jobData.data.jobtype == 'Lavaplatos'} onClick={this.hideOtroInput} value="Lavaplatos">Lavaplatos</option>
                    <option selected={this.state.jobData && this.state.jobData.data && this.state.jobData.data.jobtype == 'Cocinero'} value="Cocinero">Cocinero</option>
                    <option selected={this.state.jobData && this.state.jobData.data && this.state.jobData.data.jobtype == 'Deliman'} value="Deliman">Deliman</option>
                    <option value="Otro">Otro</option>
                </select>
                {
                    (this.state.jobtype === "Otro") && <div>
                            <p className="formQuestions">Porfavor especifique que busca:</p>
                            <input className="formInputs" type="text" name="whatever" required="required" onChange={this.handleChange}/>
                        </div>
                }
                <p className="formQuestions">Cuanto paga la hora?</p>

                <input className="formInputs" type="text" name="hourpay" defaultValue={this.state.jobData && this.state.jobData.data
                        ? this.state.jobData.data.hourpay
                        : ''}  onChange={this.handleChange}/>







                <p className="formQuestions">Paga en cheque o cash?</p>
                {
                    this.state.jobData && this.state.jobData.data && this.state.jobData.data.typepay === "cash" &&
                    <label htmlFor="cash">Cash<span ><input className="radio" type="radio" name="typepay" value="cash" defaultChecked="defaultChecked" required="required" onChange={this.handleChange}/></span>
                    Cheque<span ><input className="radio" type="radio" name="typepay" value="cheque"  required="required" onChange={this.handleChange}/></span>
                    Cash y Cheque<span ><input className="radio" type="radio" name="typepay" value="Cash y Cheque" required="required" onChange={this.handleChange}/></span>
                    </label>
    } {
                this.state.jobData && this.state.jobData.data && this.state.jobData.data.typepay !== "cash" || !this.state.jobData && <label htmlFor="cash">Cash
                <span ><input className="radio" type="radio" name="typepay" value="cash" required="required" onChange={this.handleChange}/></span>
            </label>
    }

    {
        this.state.jobData && this.state.jobData.data && this.state.jobData.data.typepay === "cheque" &&
        <label htmlFor="cash">Cash<span ><input className="radio" type="radio" name="typepay" value="cash"  required="required" onChange={this.handleChange}/></span>
        Cheque<span ><input className="radio" type="radio" name="typepay" value="cheque"  required="required"  defaultChecked="defaultChecked" onChange={this.handleChange}/></span>
        Cash y Cheque<span ><input className="radio" type="radio" name="typepay" value="Cash y Cheque" required="required" onChange={this.handleChange}/></span>
        </label>
    } {
        this.state.jobData && this.state.jobData.data && this.state.jobData.data.typepay !== "cheque" || !this.state.jobData && <label htmlFor="cheqye">Cheque
                <span ><input className="radio" type="radio" name="typepay" value="cheque" required="required" onChange={this.handleChange}/></span>
            </label>
    } {
        this.state.jobData && this.state.jobData.data && this.state.jobData.data.typepay === "Cash y Cheque" &&
        <label htmlFor="cash">Cash<span ><input className="radio" type="radio" name="typepay" value="cash"  required="required" onChange={this.handleChange}/></span>
        Cheque<span ><input className="radio" type="radio" name="typepay" value="cheque"  required="required" onChange={this.handleChange}/></span>
    Cash y Cheque<span ><input className="radio" type="radio" name="typepay" value="Cash y Cheque" required="required" defaultChecked="defaultChecked" onChange={this.handleChange}/></span>
        </label>
    } {
        this.state.jobData && this.state.jobData.data && this.state.jobData.data.typepay !== "Cash y Cheque" || !this.state.jobData &&  <label htmlFor="Cash y Cheque">Cash y Cheque
                <span ><input className="radio" type="radio" name="typepay" value="Cash y Cheque" required="required" onChange={this.handleChange}/></span>
            </label>
    }



    < p className = "formQuestions" > Cual es el horario
        ? </p>
    <input className="formInputs" type="text" name="schedule" defaultValue={this.state.jobData && this.state.jobData.data
            ? this.state.jobData.data.schedule
            : ''} onChange={this.handleChange}/>

    <p className="formQuestions">Direccion del restaurante
        : </p>
    <input className="formInputs" type="text" name="address" defaultValue={this.state.jobData && this.state.jobData.data
            ? this.state.jobData.data.address
            : ''} required="required" onChange={this.handleChange}/>
    <p className="formQuestions">En que area se encuentra
            ? </p>
        <select className="formInputs" type="text" name="area" defaultValue={this.state.jobData && this.state.jobData.data
                ? this.state.jobData.data.area
                : ''} required="required" onChange={this.handleChange}>
            <option value=""></option>
            <option selected={this.state.jobData && this.state.jobData.data && this.state.jobData.data.area == 'Manhattan'} value="Manhattan">Manhattan</option>
            <option selected={this.state.jobData && this.state.jobData.data && this.state.jobData.data.area == 'Brooklyn'} value="Brooklyn">Brooklyn</option>
            <option selected={this.state.jobData && this.state.jobData.data && this.state.jobData.data.area == 'El Bronx'} value="El Bronx">El Bronx</option>
            <option selected={this.state.jobData && this.state.jobData.data && this.state.jobData.data.area == 'Queens'} value="Queens">Queens</option>
            <option selected={this.state.jobData && this.state.jobData.data && this.state.jobData.data.area == 'Staten Island'} value="Staten Island">Staten Island</option>
        </select>
        <p className="formQuestions">Numero de celular(opcional)
                ? </p>
            <input className="formInputs" type="text" name="phone" defaultValue={this.state.jobData && this.state.jobData.data
                    ? this.state.jobData.data.phone
                    : ''}  onChange={this.handleChange}/>
            <p className="formQuestions">Por quien preguntar
                    ? </p>
                <input className="formInputs" type="text" name="contact" defaultValue={this.state.jobData && this.state.jobData.data
                        ? this.state.jobData.data.contact
                        : ''} required="required" onChange={this.handleChange}/>

                <input id="listo" onClick={this.submision} type="submit" value="Listo"/>

            </form>
        </div>);
}
}
