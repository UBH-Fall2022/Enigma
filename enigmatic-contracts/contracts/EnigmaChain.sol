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

    uint256 sizeOfContributors;

    mapping(address => uint256) contributors;
    address owner;
    address[] verifiers;

    uint256 addressRegistryCount;

    ContributorStruct[] AllContributors;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    constructor() {
        owner = tx.origin;
        verifiers = [tx.origin];
    }

    function promoteAsVerifier() public returns (bool) {
        //If tx sender is owner
        // Add value to verifiers
        if (msg.sender == tx.origin) {
            if (isVerifierExists(msg.sender)) {
                verifiers.push(msg.sender);
                return true;
            }
        }
        return false;
    }

    function addContrib(address contributor) public returns (bool) {
        // Adding contributor if transaction is coming from origin
        for (uint256 i = 0; i < verifiers.length; i++) {
            if (verifiers[i] == tx.origin) {
                bool found = false;
                for(uint256 j=0; j<AllContributors.length; j++){
                    if(AllContributors[j].contributor==contributor) {
                        AllContributors[j].weight++;
                        found = true;
                    }
                }
                if(!found) {
                    ContributorStruct memory newcontrib;
                    newcontrib.contributor = contributor;
                    newcontrib.weight = 1;
                    AllContributors.push(newcontrib);
                }
                sizeOfContributors++;

                return true;
            }
        }
        return false;
    }

    function isVerifierExists(address verifier) public view returns (bool) {
        for (uint256 i = 0; i < verifiers.length; i++) {
            if (verifiers[i] == verifier) {
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

    function getAllContributors()
        public
        view
        returns (ContributorStruct[] memory)
    {
        return AllContributors;
    }

    function sendViaCall(address receiver) public payable {
        //uint value = contributors[receiver];

        (bool sent, bytes memory data) = receiver.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

    function getWeightOfContributor(address contributorAddress)
        public
        view
        returns (uint256 weight)
    {
        //Getting contributors weight from the array of struct
        for (uint256 i = 0; i < AllContributors.length; i++) {
            ContributorStruct memory contributorObject = AllContributors[i];
            if (contributorObject.contributor == contributorAddress) {
                return contributorObject.weight;
            }
        }
    }
}
