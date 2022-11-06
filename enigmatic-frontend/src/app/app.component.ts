import { Component } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ContractService } from './services/contract.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'enigmatic-frontend';
  weight: Observable<number>;
  myaddress: Observable<string>;
  constructor(public contractService: ContractService) {
    this.myaddress = contractService.senderAddress;
    this.weight = contractService.senderAddress.pipe(switchMap((address) => contractService.getWeightOfContributor(address)));
  }
}
