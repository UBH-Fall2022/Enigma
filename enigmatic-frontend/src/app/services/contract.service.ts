import { Injectable } from '@angular/core';
import { from, map, Observable, switchMap } from 'rxjs';
import Web3 from "web3";
import EnigmaChain from "../../assets/EnigmaChain.json";

export interface ContributorStruct {
  address: string,
  weight: number,
}

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
    const addresses = from(this.ethereum.request({ method: 'eth_requestAccounts' }) as Promise<string[]>);
    this.senderAddress = addresses.pipe(map(addresses => addresses[0]));

    const abi = EnigmaChain.abi;
    const contractAddress = EnigmaChain.networks[5777].address;
    console.log(contractAddress)
    console.log(abi)

    this.contract = new this.web3.eth.Contract(abi as any, contractAddress);
  }

  async purchaseDataset() {
    // this.getAllContributors().pipe(
    //   switchMap(address => {
    //     const ans = [];
    //     address.forEach(element => {
    //       const hack = {
    //         gasPrice: this.web3.utils.toHex(21000),
    //         gas: this.web3.utils.toHex(21000),
    //         to: element,
    //         from: this.ethereum.selectedAddress,
    //         value: this.web3.utils.numberToHex(this.web3.utils.toWei('0.2', 'ether')),

    //       }
    //       const txHash = this.ethereum.request({
    //         method: 'eth_sendTransaction',
    //         params: [transactionParameters],
    //       }) as Observable;
    //       ans.push(from(txHash))
    //       return txHash

    //     })
    // //   })
    // )
    // const transactionParameters = {
    //   gasPrice: this.web3.utils.toHex(21000),
    //   gas: this.web3.utils.toHex(21000),
    //   to: '0x7dC8F825d2E32a6ee7804698f9Dc609C51A7C50E',
    //   from: this.ethereum.selectedAddress,
    //   value: this.web3.utils.numberToHex(this.web3.utils.toWei('0.2', 'ether')),
    // };

    // // signedTx = await this.web3.eth.accounts.signTransaction(tx, signer.privateKey)
    // const txHash = this.ethereum.request({
    //   method: 'eth_sendTransaction',
    //   params: [transactionParameters],
    // });
    this.getAllContributors().subscribe(
      contrib => {
        const hashes: Promise<any>[] = [];
        contrib.forEach(cont => {
          const transactionParameters = {
            gasPrice: this.web3.utils.toHex(21000),
            gas: this.web3.utils.toHex(21000),
            to: cont.address,
            from: this.ethereum.selectedAddress,
            value: this.web3.utils.numberToHex(this.web3.utils.toWei((0.1 * cont.weight).toString(), 'ether')),
          };
          const txHash = this.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
          });
          hashes.push(txHash)
        });
        Promise.all(hashes).finally(
          () => {
            console.log('done')
            window.location.href = 'http://localhost:8000/api/dataset.json'
          }
        );
      }
    )
    // console.log(txHash)
  }

  getAllContributors(): Observable<ContributorStruct[]> {
    const allcontrib = from(this.contract.methods.getAllContributors().call() as Promise<string[][]>);
    return allcontrib.pipe(
      map(allcontrib => {
        const anscontrib: ContributorStruct[] = [];
        allcontrib.forEach(el => {
          anscontrib.push({ address: el[0], weight: parseInt(el[1]) });
        });
        return anscontrib;
      })
    )
  }

  getWeightOfContributor(address: string): Observable<number> {
    return from(this.contract.methods.getWeightOfContributor(address).call() as Promise<number>);
  }
  getsizeOfContributors(): Observable<number> {
    return from(this.contract.methods.getsizeOfContributors().call() as Promise<number>);
  }
}
