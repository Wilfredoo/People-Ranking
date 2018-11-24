import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

export class JobForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        axios.get("/getJobforCorrect").then(result => {
            console.log("here are the results in jobform: ", result);
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
                contact: result.data.data.contact,



            }, () => {
                console.log("state in componentDidMount: ", this.state);
            })
        });
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
        // console.log("state is here", this.state);
        axios.post('/finalizeJob', this.state).then(resp => {
            // console.log(this);
            if (resp.data.success) {
                this.props.history.push('/jobConfirm');
            }
        })
    }



    render() {
        console.log("here is the state: ", this.state.jobData && Object.keys(this.state.jobData).length);
        return (<div className="jobForm">
            < form onSubmit={this.handleSubmit
}>
                <h1>Crear Nuevo Puesto</h1>
                <p className="formQuestions">Como se llama su restaurante?</p>

                <input className="formInputs" type="text" name="restname" defaultValue={this.state.jobData && this.state.jobData.data
                        ? this.state.jobData.data.restname
                        : ''} required="required" onChange={this.handleChange}/>}

                <p className="formQuestions">Que posicion busca?</p>
                <select className="formInputs" type="text" name="jobtype" defaultValue={this.state.jobData && this.state.jobData.data
                        ? this.state.jobData.data.jobtype
                        : ''} required="required" onChange={this.handleChange}>
                    <option value=""></option>
                    <option onClick={this.hideOtroInput} value="Lavaplatos">Lavaplatos</option>
                    <option value="Cocinero">Cocinero</option>
                    <option value="Line Cook">Line Cook</option>
                    <option value="Preparador">Preparador</option>
                    <option value="Mesero">Mesero/a</option>
                    <option value="Porter">Porter</option>
                    <option value="Pora">Pora</option>
                    <option value="Otro">Otro</option>
                </select>
{ (this.state.jobtype === "Otro" )&&
            <div>    <p className="formQuestions" >Porfavor especifique:</p>
                <input className="formInputs" type="text" name="jobtype" required="required" onChange={this.handleChange} />
</div>
}
                <p className="formQuestions">Cuanto paga la hora?</p>

                <input className="formInputs" type="text" name="hourpay" defaultValue={this.state.jobData && this.state.jobData.data
                        ? this.state.jobData.data.hourpay
                        : ''} required="required" onChange={this.handleChange}/>

                <p className="formQuestions">Paga en cheque o cash?</p>
                <span >
                    <label htmlFor="cash">Cash
                    </label><input className="radio" type="radio" name="typepay" value="cash" required="required" onChange={this.handleChange}/></span>
                <span>
                    <label onChange={this.handleChange} htmlFor="ambos">
                        Ambos
                    </label><input className="radio" type="radio" value="ambos" name="typepay" onChange={this.handleChange}/></span>
                <span>
                    <label onChange={this.handleChange} htmlFor="cheque">
                        Cheque
                    </label><input className="radio" type="radio" value="cheque" name="typepay" onChange={this.handleChange}/></span>
                <p className="formQuestions">Cual es el horario?</p>
                <input className="formInputs" type="text" name="schedule" defaultValue={this.state.jobData && this.state.jobData.data
                        ? this.state.jobData.data.schedule
                        : ''} required="required" onChange={this.handleChange}/>
                <p className="formQuestions">Direccion del restaurante:</p>
                <input className="formInputs" type="text" name="address" defaultValue={this.state.jobData && this.state.jobData.data
                        ? this.state.jobData.data.address
                        : ''} required="required" onChange={this.handleChange}/>
                <p className="formQuestions">En que area se encuentra?</p>
                <select className="formInputs" type="text" name="area" defaultValue={this.state.jobData && this.state.jobData.data
                        ? this.state.jobData.data.area
                        : ''} required="required" onChange={this.handleChange}>
                    <option value=""></option>
                    <option value="Manhattan">Manhattan</option>
                    <option value="Brooklyn">Brooklyn</option>
                    <option value="El Bronx">El Bronx</option>
                    <option value="Queens">Queens</option>
                    <option value="Staten Island">Staten Island</option>
                </select>
                <p className="formQuestions">Numero de celular (opcional)?</p>
                <input className="formInputs" type="number" name="phone" defaultValue={this.state.jobData && this.state.jobData.data
                        ? this.state.jobData.data.phone
                        : ''} required="required" onChange={this.handleChange}/>
                <p className="formQuestions">Por quien preguntar?</p>
                <input className="formInputs" type="text" name="contact" defaultValue={this.state.jobData && this.state.jobData.data
                        ? this.state.jobData.data.contact
                        : ''} required="required" onChange={this.handleChange}/>

                <input id="listo" type="submit" value="Listo"/>

            </form>
        </div>
        );
}
}
