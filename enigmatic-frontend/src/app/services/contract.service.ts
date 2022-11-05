import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import Web3 from "web3";

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  ethereum: any;
  web3: Web3;
  networkId: Promise<number>;
  addresses: Promise<string[]>;


  constructor() { 
    this.ethereum = (window as any).ethereum;
    this.web3 = new Web3(this.ethereum);
    this.networkId = this.web3.eth.net.getId();
    this.addresses = this.ethereum.request({method: 'eth_requestAccounts' });
  }
}
