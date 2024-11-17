var ClinicalTrails = artifacts.require("./ClinicalTrails.sol");
const Web3 = require("web3");
const web3 = new Web3("http://localhost:8545");

async function getaddress() {
  const accounts = await web3.eth.getAccounts();
  return accounts.slice(0, 10);
}

module.exports = async function (deployer) {
  deployer.deploy(ClinicalTrails);
  address = await getaddress();
  const instance = await MyContract.deployed();
};
