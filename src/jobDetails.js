// import React from 'react'
// import {Link} from 'react-router-dom'
// import axios from 'axios';
//
// export class JobDetails extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             value: ''
//         };
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//
//
//     componentDidMount() {
//         const jobId = this.props.match.params.id
//         axios.get("/getJobDetails/" + jobId).then(result => {
//
//             console.log("got to then of getJobDetails");
//             console.log("getJobDetails results: ", result);
//
//             this.setState({
//                 jobData: result.data
//             })
//         });
//     }
//
//     handleChange(event) {
//         this.setState({
//             [event.target.name]: event.target.value
//         },() => { console.log("state in handle change: ", this.state);});
//     }
//
//     handleSubmit(event) {
//         console.log("I am working", this.state);
//         event.preventDefault();
//     }
//
//     render() {
//     if (!this.state.jobData) {
//         return null;
//     }
//         return (
//             <div>
//                 <form onSubmit = {this.handleSubmit} >
//                     <div className="jobDetails">
//                         <table>
//                             <tr>
//                                <td className="confirmText">Restaurante:</td>
//                                <td className="confirmText">{this.state.jobData.data.restname}</td>
//                                <button class="btn"><i class="fa fa-close"></i></button>
//
//                              </tr>
//                              <tr>
//                                <td className="confirmText">Puesto:</td>
//                                <td className="confirmText">{this.state.jobData.data.jobtype}</td>
//                              </tr>
//                              <tr>
//                                <td className="confirmText">Salario:</td>
//                                <td className="confirmText">{this.state.jobData.data.hourpay}</td>
//                              </tr>
//                              <tr>
//                                <td className="confirmText">Paga en:</td>
//                                <td className="confirmText">{this.state.jobData.data.typepay}</td>
//                              </tr>
//                              <tr>
//                                <td className="confirmText">Horario:</td>
//                                <td className="confirmText">{this.state.jobData.data.schedule}</td>
//                              </tr>
//                              <tr>
//                                <td className="confirmText">Direccion:</td>
//                                <td className="confirmText">{this.state.jobData.data.address}</td>
//                              </tr>
//                              <tr>
//                                <td className="confirmText">Numero:</td>
//                                <td className="confirmText">{this.state.jobData.data.phone}</td>
//                              </tr>
//                              <tr>
//                                <td className="confirmText">Preguntar por:</td>
//                                <td className="confirmText">{this.state.jobData.data.contact}</td>
//                              </tr>
//                          </table>
//
//                 </div>
//                 </form>
//             </div>);
//         }
//     }
