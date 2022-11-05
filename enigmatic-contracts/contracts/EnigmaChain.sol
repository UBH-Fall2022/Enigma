// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;


// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract EnigmaChain {
    struct ContributorStruct {
        address contributor;
        uint256 weight;
        //address[] contributors;
        //mapping(address => uint256) myMappingInStruct;

    }

    uint sizeOfContributors;

    mapping(address => uint256) contributors;
    address owner;
    address[] verifiers;

    uint addressRegistryCount;   

    ContributorStruct[] AllContributors;
    

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    constructor() {
        owner = tx.origin;
        verifiers = [tx.origin];
        
    }
    /*
    function make() {
        //If tx sender is owner
        // Add value to verifiers
    }
    */


    function addContrib(address contributor) public returns (bool) {
        for (uint256 i = 0; i < verifiers.length; i++) {
            if (verifiers[i] == tx.origin) {
                contributors[contributor] += 1;
                contributors[tx.origin] += 1;

                
                AllContributors[i].contributor = contributor;
                AllContributors[i].weight +=1;
                sizeOfContributors++;

                return true;
            }
        }
        return false;
    }

    function sendCoin(address receiver, uint256 amount)
        public
        returns (bool sufficient)
    {
        if (contributors[msg.sender] < amount) return false;
        contributors[msg.sender] -= amount;
        contributors[receiver] += amount;
        emit Transfer(msg.sender, receiver, amount);
        return true;
    }
/*
 function getAll() public view returns (address[] memory){
    address[] memory ret = new address[](addressRegistryCount);
    for (uint i = 0; i < addressRegistryCount; i++) {
        ret[i] = contributors;
    }
    return ret;
}
*/

    function getAllContributors() public view returns (ContributorStruct[] memory) {
    return AllContributors;
    }

    function sendViaCall(address receiver) public payable {

        //uint value = contributors[receiver];
        
        (bool sent, bytes memory data) = receiver.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

    function getBalance(address addr) public view returns (uint256) {
        return contributors[addr];
    }
}