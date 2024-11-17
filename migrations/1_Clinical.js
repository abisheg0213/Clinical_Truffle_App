var ClinicalTrails = artifacts.require("./ClinicalTrails.sol");
const Web3 = require("web3");
const web3 = new Web3("http://localhost:8545");

async function getAddress() {
  const accounts = await web3.eth.getAccounts();
  return accounts.slice(0, 10);
}

async function register_FDA(instance, address) {
  console.log("FDA Authority Registered");
  // Additional registration logic goes here if needed
}

module.exports = async function (deployer) {
  const addresses = await getAddress();
  await deployer.deploy(ClinicalTrails, addresses[0]);
  const instance = await ClinicalTrails.deployed();
  await register_FDA(instance, addresses);
};
