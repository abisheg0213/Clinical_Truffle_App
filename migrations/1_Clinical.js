var ClinicalTrails = artifacts.require("./ClinicalTrails.sol");
const Web3 = require("web3");
const web3 = new Web3("http://localhost:8545");
const config = require("../config_clinical.json");

async function getAddress() {
  const accounts = await web3.eth.getAccounts();
  return accounts.slice(0, 10);
}

async function submit_application(instance, hash, status, add) {
  const data = await instance.submit_Application(hash, status, {
    from: add,
    value: 200,
  });
  console.log(data);
}
async function approve_application(instance, app_id, status, fda) {
  const data = await instance.approve_application(app_id, status, {
    from: fda,
  });
  console.log(data);
}
async function CT_trail(
  instance,
  CT_number,
  start_time,
  end_time,
  noofpaitents,
  max_age,
  CTProtocolHash,
  SOPHash,
  PI_CVHash,
  add
) {
  const data = await instance.clinical_trail_Request(
    CT_number,
    start_time,
    end_time,
    noofpaitents,
    max_age,
    CTProtocolHash,
    SOPHash,
    PI_CVHash,
    { from: add }
  );
  console.log(data);
}
async function approve_CT(instance, id, add) {
  const data = await instance.approve_CT_request(id, { from: add });
  console.log(data);
}
async function assign_physician(instance, cid, addr, sender) {
  const data = await instance.assign_physician(cid, addr, { from: sender });
  console.log(data);
}
async function enroll_paitient(
  instance,
  padd,
  pait_id,
  ct_number,
  age,
  consent_completed,
  medical_remark,
  medical_report_hash,
  physican
) {
  const data = await instance.enroll_paitient(
    padd,
    pait_id,
    ct_number,
    age,
    consent_completed,
    medical_remark,
    medical_report_hash,
    { from: physican }
  );
  console.log(data);
}
async function enroll_completed(instance, id, physican) {
  const data = await instance.enroll_completed(id, { from: physican });
  console.log(data);
}
async function enter_result(instance, pid, res) {
  const data = await instance.enter_result(pid, res);
  console.log(data);
}
async function declare_trail_result(instance, cid) {
  const data = await instance.declare_trail_result(cid);
  if(!data){
  console.log("The Results of the clinical Trail is that Drug Not Approved for supply");
  }
  else{
  console.log("The Results of the clinical Trail is that Drug Approved for supply");
  }
}
async function validsp(instance, add) {
  const data = await instance.valid_sponsor(add);
  console.log(data);
}
module.exports = async function (deployer) {
  const addresses = await getAddress();
  await deployer.deploy(ClinicalTrails, addresses[6]);
  fda_authority = addresses[6];
  const instance = await ClinicalTrails.deployed();
  sponsor = addresses[7];
  await submit_application(instance, config[0].hash, true, addresses[7]);
  await approve_application(instance, config[1].app_id, true, fda_authority);
  await CT_trail(
    instance,
    config[2].CT_number,
    config[2].start_time,
    config[2].end_time,
    config[2].noofpaitents,
    config[2].max_age,
    config[2].CTProtocolHash,
    config[2].SOPHash,
    config[2].PI_CVHash,
    addresses[7]
  );
  await approve_CT(instance, config[3].id, fda_authority);
  physican = addresses[8];
  await assign_physician(instance, config[4].cid, addresses[8], sponsor);
  enroll_paitient(
    instance,
    addresses[4],
    config[5].pait_id,
    config[5].ct_number,
    config[5].age,
    config[5].consent_completed,
    config[5].medical_remark,
    config[5].medical_report_hash,
    physican
  );
  enroll_paitient(
    instance,
    addresses[5],
    config[6].pait_id,
    config[6].ct_number,
    config[6].age,
    config[6].consent_completed,
    config[6].medical_remark,
    config[6].medical_report_hash,
    physican
  );
  enroll_paitient(
    instance,
    addresses[9],
    config[7].pait_id,
    config[7].ct_number,
    config[7].age,
    config[7].consent_completed,
    config[7].medical_remark,
    config[7].medical_report_hash,
    physican
  );
  enter_result(instance, config[8].pid, true);
  enter_result(instance, config[9].pid, true);
  enter_result(instance, config[10].pid, true);
  declare_trail_result(instance, config[11].cid);
};
