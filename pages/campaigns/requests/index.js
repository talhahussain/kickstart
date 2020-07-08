import React from 'react'
import Layout from '../../../component/layout';
import {Link} from '../../../routes';
import { Button, Table, Tab } from 'semantic-ui-react';
import RequestRow from '../../../component/requestRow';
import Campaign from '../../../ethereum/campaign'

class RequestIndex extends React.Component {

     
     static async getInitialProps(props) {

          const {address} = props.query;

          const campaign = Campaign(address)
          const requestCount = await campaign.methods.getRequestsCount().call();
          const approversCount = await campaign.methods.approversCount().call();

          const requests = await Promise.all(
               Array(parseInt(requestCount)).fill().map( (element, index) => {
                    return campaign.methods.requests(index).call();
               })
          )
          return {address, requests, requestCount, approversCount}
     }
     renderRows() {

          return this.props.requests.map((request, index) => {

               return (

                    <RequestRow
                         key={index}
                         id={index}
                         approversCount={this.props.approversCount}
                         request={request}
                         address={this.props.address} 
                    />
               )
               
          })
     }
     render() {

          const {Header, Body, Row, HeaderCell} = Table;
          return(
               <Layout>
                    <h3>Requests</h3>
                    <Link route={`/campaigns/${this.props.address}/requests/new`}>
                         <a>
                              <Button floated="right" style={{marginBottom: '10px'}} primary>Add Request</Button>
                         </a>
                    </Link>
                    <Table>
                         <Header>
                              <Row>
                                   <HeaderCell>ID</HeaderCell>
                                   <HeaderCell>Description</HeaderCell>
                                   <HeaderCell>Amount</HeaderCell>
                                   <HeaderCell>Recipient</HeaderCell>
                                   <HeaderCell>Approval</HeaderCell>
                                   <HeaderCell>Approve</HeaderCell>
                                   <HeaderCell>Finalize</HeaderCell>                                   
                              </Row>
                         </Header>
                         <Body>
                              {this.renderRows()}
                         </Body>
                    </Table>
                    <div>Found {this.props.requestCount} request</div>
               </Layout>
          )
     }
}
export default RequestIndex;