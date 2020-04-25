import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import firebase from '../dependencies/firebase'
import Campaign from '../dependencies/campaign'

/* Name
 * About
 * Deadline
 * Goal
 */

export class NewCampaign extends Component {

    state = {
        name: '',
        about: '',
        deadline: '',
        goal: '',
        address: '',
    };

    handleInput = (event) => {
        if(event.target.name === 'submit') {
            event.preventDefault();

            Campaign.deploy(this.state.deadline, this.state.goal)
            .on('error', function(error){
                console.log("Error in deployment -> " + error);
            })
            .on('transactionHash', function(transactionHash){
                console.log("Transaction Hash : " + transactionHash);
            })
            .on('receipt', function(receipt){
                console.log("Address of new contract : 12 -> " + receipt.contractAddress) // contains the new contract address
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log("Confirmation recieved ", confirmationNumber);
            })
            .then((newContractInstance) => {
                console.log("Successfully Deployed at ", newContractInstance.options.address) // instance with the new contract address

                const db = firebase.firestore();

                let dbData = {
                    about: this.state.about,
                    address: newContractInstance.options.address,
                    name: this.state.name,
                    over: false
                };

                db.collection('contracts').add(dbData).then( () => {
                    console.log("Contract added to Database");
                    this.props.history.push('/');
                }).catch((error) => {
                    console.log("Error adding document: ", error);
                })
            });

        } else {
            const name = event.target.name;
            const value = event.target.value;
            this.setState({[name]: value});
        }
    };

    render() {
        return (
            <Form>
                <Row>
                    <Col>
                        <Form.Group controlId="formGroupName">
                            <Form.Label>Enter Name of the company</Form.Label>
                            <Form.Control value={this.state.name} onChange={this.handleInput} name='name' type="text" placeholder="How should people refer you ?" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formGroupAbout">
                            <Form.Label>About</Form.Label>
                            <Form.Control value={this.state.about} onChange={this.handleInput} name='about' type="text" placeholder="Tell us what you do"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formGroupDeadline">
                            <Form.Label>Deadline for the campaign</Form.Label>
                            <Form.Control value={this.state.deadline} onChange={this.handleInput} name='deadline' type="text" placeholder="How long should this campaign run ?" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formGroupGoal">
                            <Form.Label>Goal for the campaign</Form.Label>
                            <Form.Control value={this.state.goal} onChange={this.handleInput} name='goal' type="text" placeholder="How much do you plan to collect ?" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="outline-info" name='submit' onClick={this.handleInput}>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default NewCampaign;