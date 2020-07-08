import React from 'react'
import {Form, Button, Input, Message} from 'semantic-ui-react'
import Layout from '../../../component/layout'
import Campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import {Router, Link} from '../../../routes'

class RequestNew extends React.Component {

     state ={
          value: '',
          description: '',
          recepient: '',
          errorMessage: '',
          loading: false
          
     }
     static async getInitialProps(props){

          const {address} = props.query

          return {address}
     }
     onSubmit = async (e) => {

          e.preventDefault();

          const campaign = Campaign(this.props.address)
          try{
          
              this.setState({loading: true, errorMessage: ''})
               const accounts = await  web3.eth.getAccounts();

               await campaign.methods.createRequest(
                    this.state.description,
                    web3.utils.toWei(this.state.value, 'ether'),
                    this.state.recepient
               ).send({from: accounts[0]})
               
               Router.pushRoute(`/campaigns/${this.props.address}/requests`)
          }
          catch(err){
               this.setState({errorMessage: err.message})
          }
          this.setState({loading: false})
     }
     render() {

          return(

               <Layout>               
                    <Link route={`/campaigns/${this.props.address}/requests`}>
                         <a>Back</a>
                    </Link>
                    <h3>Create a Request</h3>
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

                         <Form.Field>
                              <label>Description</label>
                              <Input
                                   value={this.state.description}
                                   onChange={e=> this.setState({description: e.target.value})}
                              />
                         </Form.Field>
                         <Form.Field>
                              <label>Value in Ether</label>
                              <Input
                                   value={this.state.value}
                                   onChange={e=> this.setState({value: e.target.value})}
                              />
                         </Form.Field>
                         <Form.Field>
                              <label>Recepient</label>
                              <Input
                                   value={this.state.recepient}
                                   onChange={e=> this.setState({recepient: e.target.value})}
                              />
                         </Form.Field>
                         <Message error header="Opps!" content={this.state.errorMessage} />
                         <Button loading={this.state.loading} primary>Create!</Button>

                    </Form>
               </Layout>

          )
     }
}

export default RequestNew;