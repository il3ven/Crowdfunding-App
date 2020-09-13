import React, { Component } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import web3 from "./dependencies/web3";
// import { contract } from "./dependencies/campaign";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import CampaignList from "./components/campaignList";
import NewCampaign from "./components/newCampaign";

class App extends Component {
  componentDidMount() {
    // web3.eth.getAccounts(console.log);
    // console.log(web3.eth.defaultAccount);
  }

  // a = () => {
  //   contract.methods
  //     .getTimeLeft()
  //     .call({ from: web3.eth.defaultAccount })
  //     .then(console.log);
  // };

  render() {
    return (
      <Router>
        <Container>
          <Row>
            <Col md style={header}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <h1 align="center" style={heading}>
                  Crowdfunding App
                </h1>
              </Link>
            </Col>
          </Row>
          <Row style={{ marginTop: "0px", borderBottom: "1px #ccc dotted" }}>
            <Col xs={8}>
              <h4>List of Available Campaigns</h4>
            </Col>
            <Col style={{ margin: "3px", textAlign: "right" }}>
              <Link to="/newCampaign">
                <Button variant="outline-dark" size="sm">
                  Start a New Campaign
                </Button>
              </Link>
            </Col>
          </Row>

          <Switch>
            <Route path="/" exact render={(props) => <CampaignList />} />
            <Route path="/newCampaign" exact component={NewCampaign} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

const header = {
  // No style for now
};

const heading = {
  color: "#fffdfa",
  background: "#474044",
  border: "none",
  borderRadius: "7px",
  padding: "8px",
};

export default App;
