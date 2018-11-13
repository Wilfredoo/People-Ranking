import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

export class Jobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get("/getJobs").then(result => {
            console.log("result in axios /getJobs: ", result.data);
            this.setState({jobData: result.data})
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            userSelection: event.target.value
        }, () => {
            console.log("state in handle change: ", this.state);
        })

    }

    handleSubmit(event) {
        location.replace('/jobForm')

    }

    render() {
        if (!this.state.jobData) {
            return null;
        }

        return (<div>
            <form onSubmit={this.handleSubmit}>
                <select type="text" name="jobtype" onChange={this.handleChange}>
                    <option value="">Puesto</option>
                    <option value="Line Cook">Line Cook</option>
                    <option value="Lavaplatos">Lavaplatos</option>
                    <option value="Cocinero">Cocinero</option>
                    <option value="Pora">Pora</option>
                    <option value="Mesero">Mesero</option>
                    <option value="Porter">Porter</option>
                    <option value="Otro">Otro</option>
                </select>

                <select type="text" name="area" onChange={this.handleChange}>
                    <option value="">Area</option>
                    <option value="Manhattan">Manhattan</option>
                    <option value="Brooklyn">Brooklyn</option>
                    <option value="Queens">Queens</option>
                    <option value="El Bronx">El Bronx</option>
                    <option value="Staten Island">Staten Island</option>
                </select>

                <Link to="/jobForm"><input type="submit" value="Crear puesto"/></Link>
                {

                    this.state.userSelection && this.state.jobData.data.map(data => {

                        if (this.state.userSelection === data.jobtype) {
                        return (<div className="jobData" key={data.id}>
                            <p>{data.restname}
                                busca {data.jobtype}</p>
                            <p>Salario: {data.hourpay}$ la hora</p>
                            <p>Area: {data.address}</p>
                            <p>---------------------</p>
                        </div>)
                    }
                })
            }
            {

                !this.state.userSelection && this.state.jobData.data.map(data => {


                    return (<div className="jobData" key={data.id}>
                        <p>{data.restname}
                            busca {data.jobtype}</p>
                        <p>Salario: {data.hourpay}$ la hora</p>
                        <p>Area: {data.address}</p>
                        <p>---------------------</p>
                    </div>)
            })
        }
            </form>

        </div>);

}
}
