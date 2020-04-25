import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Camp} from './camp'
import firebase from '../dependencies/firebase';

export class CampaignList extends Component {
    state = {
        campaigns : [ ]
    };

    componentDidMount() {
        const db = firebase.firestore();

        db.collection("contracts").get().then((querySnapshot) => {
            let response = [];
            querySnapshot.forEach((doc) => {
                // this.state.campaigns.push(doc.data());
                response.push(doc.data());
            });
            this.setState({campaigns: response});
        })
        .catch(function(error) {
            console.error("Error reading collection: ", error);
        });
    }

    campaignOver = (address) => {
        let newCampaigns = this.state.campaigns;
        for(var i in newCampaigns) {
            if(newCampaigns[i].address === address) {
                newCampaigns[i].over = true;
                break;
            }
        }
        this.setState({campaigns: newCampaigns})
        console.log("Campaign is Over for ", address);
    };

    render() {
        return (
            <Row style={{marginTop: '3px'}}>
                <Col>
                    {this.state.campaigns.map(element => {
                        if(!element.over) 
                            return (<Camp campaign={element} key={element.address} campaignOver={this.campaignOver} />);
                        return (null);
                    })}
                </Col>
            </Row>
        )
    }
}

export default CampaignList;