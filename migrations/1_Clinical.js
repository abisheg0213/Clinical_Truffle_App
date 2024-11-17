var ClinicalTrails = artifacts.require("./ClinicalTrails.sol");
const Web3 = require("web3");
const web3 = new Web3("http://localhost:8545");

async function getAddress() {
  const accounts = await web3.eth.getAccounts();
  return accounts.slice(0, 10);
}

async function submit_application(instance,hash,status ) {
  const data=await instance.submit_Application(hash,status,{value:200})
    console.log(data)
}
async function approve_application(instance,app_id,status,fda) {
    const data=await instance.approve_application(app_id,status,{from:fda})
    console.log(data)
}
async function name(params) {
    
}
module.exports = async function (deployer) {
  const addresses = await getAddress();
  await deployer.deploy(ClinicalTrails, addresses[6]);
  fda_authority=addresses[6]
  const instance = await ClinicalTrails.deployed();
  await submit_application(instance,"0x5765676",true)
  await approve_application(instance,1,true,fda_authority)
};
