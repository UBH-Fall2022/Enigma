const EnigmaChain = artifacts.require("EnigmaChain");

module.exports = function(deployer) {
  deployer.deploy(EnigmaChain);
};
