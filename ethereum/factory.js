import web3 from './web3'
import compiledCampaignFactory from './build/CampaignFactory.json'


const instance = new web3.eth.Contract(
     JSON.parse(compiledCampaignFactory.interface),
     '0x446DB74dA2ab15c6852042518D38BA73680dF672'
)

export default instance;