var Drugcompany = artifacts.require("./Drugcompany.sol");
const Web3 = require("web3");
const web3 = new Web3("http://localhost:8545");

const config = require("../config.json");

async function getAddress() {
  const accounts = await web3.eth.getAccounts();
  return accounts.slice(0, 10);
}
async function register_producer(instance, address) {
  const data = await instance.reg_producer(address);
  // console.log(data);
}

async function add_produced_drug(instance, pid, amt, producer) {
  const data = await instance.add_produced_drug(pid, amt, { from: producer });
  // console.log(data);
  console.log(`Drug with PID ${pid} and amount ${amt} added successfully.`);
}

module.exports = async function (deployer) {
  const addresses = await getAddress();

  const con_owner = addresses[0];
  const producer = addresses[1];
  const manger = addresses[1];
  const hospital = addresses[2];

  await deployer.deploy(Drugcompany, con_owner);
  const instance = await Drugcompany.deployed();

  await register_producer(instance, producer);
  await add_produced_drug(instance, config.pid, config.amt, producer);
};
