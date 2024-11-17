var Drugcompany = artifacts.require("./Drugcompany.sol");
const Web3 = require("web3");
const web3 = new Web3("http://localhost:8545");

const config = require("../config.json");
const { from } = require("responselike");
const { waitForDebugger } = require("inspector");
const { inspect } = require("util");
const { pid } = require("process");
const { isContractAddressInBloom } = require("web3-utils");
const { log } = require("console");

async function getAddress() {
  const accounts = await web3.eth.getAccounts();
  return accounts.slice(0, 10);
}

//Drug Producer
async function register_producer(instance, address) {
  const data = await instance.reg_producer(address);
  // console.log(data);
}

async function drug_avl(instance, pid) {
  const data = await instance.drug_av(pid);
  console.log(`Avilabe Amt : ${pid}`); //need to be fixed
}

async function add_produced_drugs(instance, pid, amt, producer) {
  const data = await instance.add_produced_drug(pid, amt, { from: producer });
  // console.log(data);
  console.log(`Drug with PID ${pid} and amount ${amt} added successfully.`);
}

//Drug Manager
async function add_drugs(instance, pid, a, thres, rate, producer) {
  const data = await instance.add_drug(pid, a, thres, rate, { from: producer });
  console.log(
    `Drug with PID ${pid} and amount ${rate} with the threshold of ${thres}.`
  );
}

// Hospital
async function reg_host(instance, hid, hosman) {
  const data = await instance.reg_hos(hid, { from: hosman });
  console.log(`Hospital id : ${hid} registered Successfully`);
}

async function reg_doctors(instance, docid, hosman) {
  const data = await instance.reg_doctor(docid, { from: hosman });
  console.log(`Doctor Registerd ID : ${docid}`);
}

async function reg_patients(instance, patid, hosid, hosman) {
  const data = await instance.reg_patient(patid, hosid, { from: hosman });
  console.log(
    `Patient with ${patid} in hospital ${hosid} registered successfully`
  );
}

async function buy_drg(instance, hid, pid, amt, docid, patid, hosman) {
  const data = await instance.buy_drug(hid, pid, amt, docid, patid, {
    from: hosman,
  });
  console.log(
    `Patient : ${patid} in Hospital ${hid} requested drug ${pid} of ${amt} quantity pescribed by doc ${docid}`
  );
}

module.exports = async function (deployer) {
  const addresses = await getAddress();

  const con_owner = addresses[0];
  const producer = addresses[1];
  const manger = addresses[1];
  const hospital = addresses[2];

  await deployer.deploy(Drugcompany, con_owner);
  const instance = await Drugcompany.deployed();

  // Producer
  await register_producer(instance, producer);
  await add_produced_drugs(instance, config[0].pid, config[0].amt, producer);

  // Manger
  await add_drugs(
    instance,
    config[1].pid,
    config[1].amt,
    config[1].thres,
    config[1].rate,
    manger
  );

  //hospital
  await reg_host(instance, config[2].hid, hospital);
  await reg_doctors(instance, config[3].docid);
  await reg_patients(instance, config[4].patid, config[4].hosid, hospital);
  await buy_drg(
    inspect,
    config[5].hid,
    config[5].pid,
    config[5].amt,
    config[5].docid,
    config[5].patid,
    hospital
  );

  // other fuctionalities
  await update_avail(config[5].pid, config[5].amt, manger);
  await drug_avl(config[6].pid);
};
