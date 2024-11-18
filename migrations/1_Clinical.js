var ClinicalTrails = artifacts.require("./ClinicalTrails.sol");
const Web3 = require("web3");
const web3 = new Web3("http://localhost:8545");

async function getAddress() {
  const accounts = await web3.eth.getAccounts();
  return accounts.slice(0, 10);
}

async function submit_application(instance,hash,status,add ) {
  const data=await instance.submit_Application(hash,status,{from:add,value:200})
    console.log(data)
}
async function approve_application(instance,app_id,status,fda) {
    const data=await instance.approve_application(app_id,status,{from:fda})
    console.log(data)
}
async function CT_trail(instance,CT_number,start_time,end_time,noofpaitents,max_age,CTProtocolHash,SOPHash,PI_CVHash,add) {
    const data=await instance.clinical_trail_Request(CT_number,start_time,end_time,noofpaitents,max_age,CTProtocolHash,SOPHash,PI_CVHash,{from:add})
    console.log(data)
  }
  async function approve_CT(instance,id,add){
    const data=await instance.approve_CT_request(id,{from:add})
    console.log(data)

  }
module.exports = async function (deployer) {
  const addresses = await getAddress();
  await deployer.deploy(ClinicalTrails, addresses[6]);
  fda_authority=addresses[6]
  const instance = await ClinicalTrails.deployed();
  await submit_application(instance,"0x5765676",true,addresses[7])
  await approve_application(instance,1,true,fda_authority)
  await CT_trail(instance,1,1234,2000,50,60,"iuhoi","ggiuhiuh","hbknkj",addresses[7])
  await approve_CT(instance,1,fda_authority)
};
