import React, { Component } from 'react';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Campaign from '../dependencies/campaign'
import web3 from '../dependencies/web3'

export class Camp extends Component {
  state = {
    inputAmount: '',
    amountContributed: 0,
    getTimeLeft: 0,
    contractInstance: null
  };

  componentDidMount() {
    const contract = Campaign.createNewContractInstance(this.props.campaign.address);

    contract.methods.getTimeLeft().call({})
    .then((result) => {
      this.setState({getTimeLeft: result, contractInstance: contract});
    });

    contract.methods.totalAmountContributed().call({})
    .then((result) => {
      this.setState({amountContributed: result});
    });
  }

  handleChange = (event) => {
    const onlyNumbers = new RegExp('^[0-9]+$');
    console.log(this.state.inputAmount);
    if(onlyNumbers.test(this.state.inputAmount)) {
      this.state.contractInstance.methods.pledge().send({
        from: web3.eth.defaultAccount,
        value: web3.utils.toHex(this.state.inputAmount)
      })
      .on('error', function(error){
        console.log("Error in pledging -> " + error);
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
      .then((receipt) => {
          console.log("Money Pledged", receipt);

          const contract = Campaign.createNewContractInstance(this.props.campaign.address);

          contract.methods.totalAmountContributed().call({})
          .then((result) => {
            this.setState({amountContributed: result});
          });
      })
    } else {
      alert("Entered amount should be a numerical value")
    }
  };

  handleAmountChange = (event) => {
    this.setState({inputAmount: event.target.value});
  };

  claimFunds = () => {
    console.log("Trying to claim funds");

    this.state.contractInstance.methods.claimFunds().send({
      from: web3.eth.defaultAccount,
      gas: 33544
    })
    .on('error', function(error){
      console.log("Error in Claiming Funds -> " + error);
    })
    .on('transactionHash', function(transactionHash){
        console.log("Transaction Hash : " + transactionHash);
    })
    .on('receipt', function(receipt){
        console.log("Address of new contract : -> " + receipt.contractAddress) // contains the new contract address
    })
    .on('confirmation', function(confirmationNumber, receipt){
        console.log("Confirmation recieved ", confirmationNumber);
    })
    .then((receipt) => {
        console.log("Claim Funds Successfull", receipt);

        const contract = Campaign.createNewContractInstance(this.props.campaign.address);

        contract.methods.totalAmountContributed().call({})
        .then((result) => {
          this.props.campaignOver.bind(this, this.props.campaign.address);
        });
    })
  };

  render() {
    return (
      <div style={{marginBottom: '10px', borderBottom: '1px #ccc dotted'}}>
        <Row>
          <Col>
            <h5>{this.props.campaign.name}</h5>
          </Col>
          <Col style={{textAlign: 'right'}}>
            <p>{this.state.getTimeLeft} seconds left</p>
          </Col>
        </Row>
        <Row>
          <Col xs={1}></Col>
          <Col>
            About : {this.props.campaign.about}
          </Col>
          <Col xs={4} style={{textAlign: 'right'}}>
            Total Contribution : {this.state.amountContributed} Wei
          </Col>
        </Row>
        <Row>
          <Col xs={1}></Col>
        </Row>
        <Row style={{marginTop: '2px', marginBottom: '8px'}}>
          <Col xs={1}></Col>
          <Col>
            {'₹ '}<input type='text' value={this.state.inputAmount} onChange={this.handleAmountChange} style={inputStyle} /> {' '}
            <Button variant="outline-dark" size="sm" onClick={this.handleChange}>Pledge Money</Button> {' '}
            <Button variant='outline-danger' size="sm" onClick={this.claimFunds} disabled={this.state.getTimeLeft > 0 ? true : false}>Claim Funds</Button> {' '}
          </Col>
        </Row>
      </div>
    );
  }
}

const inputStyle = {
  width: '30px',
  height: '30px', 
  verticalAlign: 'middle', 
  borderRadius: '2px', 
  border: '1px solid',
  text: '10px'
}

export default Camp;