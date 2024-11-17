const Web3 = require("web3");
const web3 = new Web3("http://localhost:8545");

web3.eth.getAccounts().then((accounts) => {
  const selectedAddresses = accounts.slice(0, 10); 
  console.log(selectedAddresses[0]); 
});
