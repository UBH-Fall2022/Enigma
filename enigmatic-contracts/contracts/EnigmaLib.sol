// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract MetaCoin {
    mapping(address => uint256) contributors;
    address owner;
    address[] verrifiers;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    constructor() {
        owner = tx.origin;
        verrifiers = [tx.origin];
    }

    function addContrib(address contributor) public returns (bool) {
        for (uint256 i = 0; i < verrifiers.length; i++) {
            if (verrifiers[i] == tx.origin) {
                contributors[contributor] += 1;
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

    function getBalanceInEth(address addr) public view returns (uint256) {
        return ConvertLib.convert(getBalance(addr), 2);
    }

    function getBalance(address addr) public view returns (uint256) {
        return contributors[addr];
    }
}