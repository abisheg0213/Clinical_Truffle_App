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
async function assign_physician(instance,cid,addr,sender){
  const data=await instance.assign_physician(cid,addr,{from:sender})
  console.log(data)
}
async function enroll_paitient(instance,padd,pait_id,ct_number,age,consent_completed,medical_remark,medical_report_hash,physican)  
{
  const data=await instance.enroll_paitient(padd,pait_id,ct_number,age,consent_completed,medical_remark,medical_report_hash,{from:physican})
  console.log(data)
}
async function enroll_completed(instance,id,physican){
  const data=await instance.enroll_completed(id,{from:physican})
  console.log(data)
}
async function enter_result(instance,pid,res){
  const data=await instance.enter_result(pid,res)
  console.log(data)
}
async function declare_trail_result(instance,cid){
  const data=await instance.declare_trail_result(cid);
  console.log(data)
}
async function validsp(instance,add) {
  const data = await instance.valid_sponsor(add)
  console.log(data)
}
module.exports = async function (deployer) {
  const addresses = await getAddress();
  await deployer.deploy(ClinicalTrails, addresses[6]);
  fda_authority=addresses[6]
  const instance = await ClinicalTrails.deployed();
  sponsor=addresses[7]
  await submit_application(instance,"0x5765676",true,addresses[7])
  await approve_application(instance,1,true,fda_authority)
  await CT_trail(instance,1,1234,2000,50,60,"iuhoi","ggiuhiuh","hbknkj",addresses[7])
  await approve_CT(instance,1,fda_authority)
  physican=addresses[8]
  await assign_physician(instance,1,addresses[8],sponsor)
  enroll_paitient(instance,addresses[4],101,1,35,true,false,"hash",physican)
  enroll_paitient(instance,addresses[5],102,1,28,true,false,"hash",physican)
  enroll_paitient(instance,addresses[9],103,1,21,true,false,"hash",physican)
  enter_result(instance,101,true)
  enter_result(instance,102,true)
  enter_result(instance,103,true)
  declare_trail_result(instance,1)
};
