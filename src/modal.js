import React from 'react';
import axios from 'axios';

export default class Modal extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }

        showModal() {
            this.setState({
                show: true
            });
        }

        componentDidMount() {
            axios.get("/getJobDetails/" + id).then(result => {

                console.log("modal results: ", result);
                this.setState({
                        jobData: result.data
                    },
                    () => {
                        console.log("state is handleclick in MODAL", this.state);
                    })
            });
        }

        hideModal() {
            this.setState({
                show: false
            });
        }

        render() {
            if (!this.state.jobData) {
                    return null;
            }
          return (

            <main className="modal">
            <table>
                <tr>
                   <td className="confirmText">Restaurante:</td>
                   <td className="confirmText"></td>
                   <button class="btn"><i class="fa fa-close">{this.state.jobData.data.restname}</i></button>
                 </tr>
             </table>
            </main>
          )
        }
      }
