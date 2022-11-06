import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import Web3 from "web3";
import EnigmaChain from "../../assets/EnigmaChain.json";

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  ethereum: any;
  web3: Web3;
  networkId: Promise<number>;
  senderAddress: Observable<string>;
  contract;


  constructor() { 
    this.ethereum = (window as any).ethereum;
    this.web3 = new Web3(this.ethereum);
    this.networkId = this.web3.eth.net.getId();
    const addresses = from(this.ethereum.request({method: 'eth_requestAccounts' }) as Promise<string[]>);
    this.senderAddress = addresses.pipe(map(addresses=>addresses[0]));

    const abi = EnigmaChain.abi;
    const contractAddress = EnigmaChain.networks[5777].address;
    console.log(contractAddress)
    console.log(abi)

    this.contract = new this.web3.eth.Contract(abi as any, contractAddress);
  }

  getWeightOfContributor(address: string): Observable<number> {
    return from(this.contract.methods.getWeightOfContributor(address).call() as Promise<number>);
  }
}
