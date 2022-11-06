import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-checkbalance',
  templateUrl: './checkbalance.component.html',
  styleUrls: ['./checkbalance.component.scss']
})
export class CheckbalanceComponent implements OnInit {

  weight: Observable<number>;
  constructor(public contractService: ContractService) {
    this.weight = contractService.senderAddress.pipe(switchMap((address) => contractService.getWeightOfContributor(address)));
  }

  ngOnInit(): void {
  }

}
