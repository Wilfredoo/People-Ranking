import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

export class JobForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            otro: '',
            otro_desc: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.submission = this.submission.bind(this);
    }

    componentDidMount() {
        axios.get("/getJobforCorrect").then(result => {
            this.setState({
                jobData: result.data,
                restname: result.data.data.restname,
                jobtype: result.data.data.jobtype,
                otro_desc: result.data.data.otro_desc,
                typepay: result.data.data.typepay,
                area: result.data.data.area,
                hourpay: result.data.data.hourpay,
                schedule: result.data.data.schedule,
                address: result.data.data.address,
                phone: result.data.data.phone,
                contact: result.data.data.contact,
                extrainfo: result.data.data.extrainfo
            });
        });
    }

    submission() {
        if (this.state.jobtype === "Otro") {
            this.setState({
                jobtype: "Otro",
                otro_desc: this.state.otro
            })
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('/finalizeJob', this.state).then(resp => {
            this.props.history.push('/jobConfirm');
            if (resp.data.success) {}
        })
    }

    render() {
        return (
            <div className="jobForm">
                <form onSubmit={this.handleSubmit}>
                    <h1>Crear Nuevo Puesto</h1>
                    <p className="formQuestions">Como se llama su deli o restaurante?</p>

                    <input className="formInputs" type="text" name="restname"
                    defaultValue={this.state.jobData && this.state.jobData.data
                    ? this.state.jobData.data.restname
                    : ''} required="required" onChange={this.handleChange}/>

                    <p className="formQuestions">Que posicion busca?</p>
                    <select className="formInputs" type="text" name="jobtype"
                    defaultValue={this.state.jobData && this.state.jobData.data
                    ? this.state.jobData.data.jobtype
                    : ''} required="required" onChange={this.handleChange}>
                        <option value=""></option>
                        <option selected={this.state.jobData && this.state.jobData.data && this.state.jobData.data.jobtype == 'Lavaplatos'} onClick={this.hideOtroInput} value="Lavaplatos">Lavaplatos</option>
                        <option selected={this.state.jobData && this.state.jobData.data && this.state.jobData.data.jobtype == 'Cocinero'} value="Cocinero">Cocinero</option>
                        <option selected={this.state.jobData && this.state.jobData.data && this.state.jobData.data.jobtype == 'Line Cook'} value="Line Cook">Line Cook</option>
                        <option selected={this.state.jobData && this.state.jobData.data && this.state.jobData.data.jobtype == 'Busboy'} value="Busboy">Busboy</option>
                        <option selected={this.state.jobData && this.state.jobData.data && this.state.jobData.data.jobtype == 'Delivery Boy'} value="Delivery Boy">Delivery Boy</option>
                        <option selected={this.state.jobData && this.state.jobData.data && this.state.jobData.data.jobtype == 'Deliman'} value="Deliman">Deliman</option>
                        <option selected={this.state.jobData && this.state.jobData.data && this.state.jobData.data.jobtype == 'Porter'} value="Porter">Porter</option>
                        <option selected={this.state.jobData && this.state.jobData.data && this.state.jobData.data.jobtype == 'Preparador'} value="Preparador">Preparador</option>
                        <option selected={this.state.jobData && this.state.jobData.data && this.state.jobData.data.jobtype == 'Mesero/a'} value="Mesero/a">Mesero/a</option>
                        <option selected={this.state.jobData && this.state.jobData.data && this.state.jobData.data.jobtype == 'Cashier'} value="Cashier">Cashier</option>
                        <option selected={this.state.jobData && this.state.jobData.data && this.state.jobData.data.jobtype == 'Bartender'} value="Bartender">Bartender</option>
                        <option selected={this.state.jobData && this.state.jobData.data && this.state.jobData.data.jobtype == 'Barback'} value="Barback">Barback</option>
                        <option selected={this.state.jobData && this.state.jobData.data && this.state.jobData.data.jobtype == 'Chef'} value="Chef">Chef</option>
                        <option selected={this.state.jobData && this.state.jobData.data && this.state.jobData.data.jobtype == 'Pizzero'} value="Pizzero">Pizzero</option>
                        <option value="Otro">Otro</option>
                    </select>

                    {
                    (this.state.jobtype === "Otro") &&
                    <div>
                        <p className="formQuestions" style={{color:"blue"}}><b>Porfavor especifique que busca:</b></p>
                        <input autoFocus className="formInputs" type="text" name="otro" required="required" onChange={this.handleChange}/>
                    </div>
                    }

                    <p className="formQuestions">Cuanto paga?</p>
                    <input className="formInputs" type="text" name="hourpay"
                    defaultValue={this.state.jobData && this.state.jobData.data
                    ? this.state.jobData.data.hourpay
                    : ''}  onChange={this.handleChange}/>

                    <p className="formQuestions">Paga en cheque o cash?</p>
                    {
                    this.state.jobData && this.state.jobData.data && this.state.jobData.data.typepay === "cash" &&
                    <label htmlFor="cash">Cash<span ><input className="radio" type="radio" name="typepay" value="cash" defaultChecked="defaultChecked" onChange={this.handleChange}/></span>
                    Cheque<span ><input className="radio" type="radio" name="typepay" value="cheque"  onChange={this.handleChange}/></span>
                    Cash y Cheque<span ><input className="radio" type="radio" name="typepay" value="Cash y Cheque" onChange={this.handleChange}/></span>
                    </label>
                    }

                    {
                    this.state.jobData && this.state.jobData.data && this.state.jobData.data.typepay !== "cash" || !this.state.jobData && <label htmlFor="cash">Cash
                    <span ><input className="radio" type="radio" name="typepay" value="cash" onChange={this.handleChange}/></span>
                    </label>
                    }

                    {
                    this.state.jobData && this.state.jobData.data && this.state.jobData.data.typepay === "cheque" &&
                    <label htmlFor="cash">Cash<span ><input className="radio" type="radio" name="typepay" value="cash" onChange={this.handleChange}/></span>
                    Cheque<span ><input className="radio" type="radio" name="typepay" value="cheque" defaultChecked="defaultChecked" onChange={this.handleChange}/></span>
                    Cash y Cheque<span ><input className="radio" type="radio" name="typepay" value="Cash y Cheque" onChange={this.handleChange}/></span>
                    </label>
                    }

                    {
                    this.state.jobData && this.state.jobData.data && this.state.jobData.data.typepay !== "cheque" || !this.state.jobData && <label htmlFor="cheque">Cheque
                    <span ><input className="radio" type="radio" name="typepay" value="cheque" onChange={this.handleChange}/></span>
                    </label>
                    }

                    {
                    this.state.jobData && this.state.jobData.data && this.state.jobData.data.typepay === "Cash y Cheque" &&
                    <label htmlFor="cash">Cash<span ><input className="radio" type="radio" name="typepay" value="cash" onChange={this.handleChange}/></span>
                    Cheque<span ><input className="radio" type="radio" name="typepay" value="cheque"  onChange={this.handleChange}/></span>
                    Cash y Cheque<span ><input className="radio" type="radio" name="typepay" value="Cash y Cheque" defaultChecked="defaultChecked" onChange={this.handleChange}/></span>
                    </label>
                    }

                    {
                    this.state.jobData && this.state.jobData.data && this.state.jobData.data.typepay !== "Cash y Cheque" || !this.state.jobData &&  <label htmlFor="Cash y Cheque">Cash y Cheque
                    <span ><input className="radio" type="radio" name="typepay" value="Cash y Cheque" onChange={this.handleChange}/></span>
                    </label>
                    }

                    < p className = "formQuestions" > Cual es el horario?</p>
                    <input className="formInputs" type="text" name="schedule"
                    defaultValue={this.state.jobData && this.state.jobData.data
                    ? this.state.jobData.data.schedule
                    : ''} onChange={this.handleChange}/>

                    <p className="formQuestions">Direccion del local:</p>
                    <input className="formInputs" type="text" name="address" defaultValue={this.state.jobData && this.state.jobData.data
                    ? this.state.jobData.data.address
                    : ''} required="required" onChange={this.handleChange}/>

                    <p className="formQuestions">En que area se encuentra?</p>
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

                    <p className="formQuestions">Numero de celular? (opcional)</p>
                    <input className="formInputs" type="text" name="phone" defaultValue={this.state.jobData && this.state.jobData.data
                    ? this.state.jobData.data.phone
                    : ''}  onChange={this.handleChange}/>

                    <p className="formQuestions">Por quien preguntar?</p>
                    <input className="formInputs" type="text" name="contact" defaultValue={this.state.jobData && this.state.jobData.data
                    ? this.state.jobData.data.contact
                    : ''} onChange={this.handleChange}/>

                    <p className="formQuestions">Algo que desee agregar?</p>
                    <input className="formInputs" type="text" name="extrainfo" defaultValue={this.state.jobData && this.state.jobData.data
                    ? this.state.jobData.data.extrainfo
                    : ''} onChange={this.handleChange}/>

                    <input id="listo" onClick={this.submission} type="submit" value="Listo"/>
                </form>
            </div>
        );
    }
}
