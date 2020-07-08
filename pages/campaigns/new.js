import React from 'react'
import Layout from '../../component/layout'
import { Form, Button, Input, Message } from 'semantic-ui-react'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import {Router} from '../../routes'

class CampaignNew extends React.Component {

     state = {
          minimumContribution: '',
          errorMessage: '',
          loading: false
     }

     onSubmit = async (e) => {

          e.preventDefault();

          this.setState({loading: true, errorMessage: ''})
          
          try{

               const accounts = await web3.eth.getAccounts();

               await factory.methods
                    .createCampaign(this.state.minimumContribution)
                    .send({
                         // donnot need to mention the gas price it automatically calculates
                         from: accounts[0]
                    })

               Router.pushRoute('/');
          }
          catch(err){

               this.setState({errorMessage: err.message})

          }
          this.setState({loading: false})
          
     }
     render() {

          return(

               <Layout>

                    <h3>New Campaign</h3>

                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                         <Form.Field>
                              <label>Minimum Contiribution</label>
                              <Input 
                                   label="wei"
                                   labelPosition="right"
                                   value={this.state.minimumContribution}
                                   onChange={e => this.setState({minimumContribution: e.target.value})}
                              />
                         </Form.Field>
                         <Message header="Oops!" error content={this.state.errorMessage} />
                         <Button loading={this.state.loading} primary>Create!</Button>
                    </Form>
               </Layout>
               
          )
     }
}
export default CampaignNew;