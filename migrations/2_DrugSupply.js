var Drugcompany = artifacts.require('./Drugcompany.sol')
module.exports=function(deployer)
{
    deployer.deploy(Drugcompany)
}