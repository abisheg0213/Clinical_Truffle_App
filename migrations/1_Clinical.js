var ClinicalTrails = artifacts.require('./ClinicalTrails.sol')
module.exports=async function(deployer)
{
    deployer.deploy(ClinicalTrails)
    const instance = await MyContract.deployed();
    
}