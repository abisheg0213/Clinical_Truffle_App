var Drugcompany = artifacts.require('./Drugcompany.sol')
const Web3 = require("web3");
const web3 = new Web3("http://localhost:8545");

async function getAddress() {
  const accounts = await web3.eth.getAccounts();
  return accounts.slice(0, 10);
}
async function register_producer(instance,address){
    const data=await instance.reg_producer(address);
    console.log(data)
}
module.exports = async function (deployer) {
    const addresses = await getAddress();
    await deployer.deploy(Drugcompany, addresses[0]);
    const instance = await Drugcompany.deployed();
    await register_producer(instance, addresses[1]);
};