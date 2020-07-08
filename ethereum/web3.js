const Web3 = require('web3')


let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){

     // we are in the browser and user has metamask installed
     web3 = new Web3(window.web3.currentProvider);
}
else{
     
     // We are in the server and user do not have metamask installed 
     const provider = new Web3.providers.HttpProvider(
          'https://rinkeby.infura.io/v3/8b626b2c79a14c1da0a483fb1a5dfa57'

     )
     web3 = new Web3(provider)
}

export default web3;