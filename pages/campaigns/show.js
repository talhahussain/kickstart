import React from 'react'
import Layout from '../../component/layout'
import Campaign from '../../ethereum/campaign'
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../component/contributeForm';
import {Link} from '../../routes';

class CampaignShow extends React.Component {

     static async getInitialProps(props) {

          const campaign = Campaign(props.query.address);
          const summary = await campaign.methods.getSummary().call();

          return {
               address             : props.query.address,
               minimumContribution : summary[0],
               balance             : summary[1],
               requestCount        : summary[2],
               approversCount      : summary[3],
               manager             : summary[4]
          };
     }
     renderCards() {

          const {
               balance,
               manager,
               minimumContribution,
               requestCount,
               approversCount
          } = this.props;

          const items = [
               {
                    header         : manager,
                    meta           : 'Address of Manager',
                    description    : 'The manager created this campaign and can request to withdraw money',
                    style          : { overflowWrap : 'break-word'}
               },
               {
                    header         : minimumContribution,
                    meta           : 'Minimum Contribution (wei)',
                    description    : 'You are required atleat this much wei to become an approver'
               },
               {
                    header         : requestCount,
                    meta           : 'No of request',
                    description    : 'A request tries to withdraw from the contract. Request Must be approved by approvers'
               },
               {
                    header         : approversCount,
                    meta           : 'No of approvers',
                    description    : 'A number of approvers who have already donated to this campaign'
               },
               {
                    header         : web3.utils.fromWei(balance, 'ether'),
                    meta           : 'Campaign Balance (ether)',
                    description    : 'A balance is how much money this campaign has left to spend'
               },
               
               
          ];

          return <Card.Group items={items} />
     }
     
     render() {

          return(

               <Layout>
                    <h3>Show Campaign</h3>
                    
                    <Grid>
                         <Grid.Row>
                              <Grid.Column width={10}>
                                   {this.renderCards()}
                              </Grid.Column>
                              <Grid.Column  width={6}>                    
                                   <ContributeForm address={this.props.address} />
                              </Grid.Column>
                         </Grid.Row>
                         <Grid.Row>
                              <Grid.Column>

                                   <Link route={`/campaigns/${this.props.address}/requests`}>
                                        <a>
                                             <Button primary>View Request</Button>
                                        </a>
                                   </Link>
                              </Grid.Column>
                         </Grid.Row>
                    </Grid>
               </Layout>
          )
     }
}
export default CampaignShow