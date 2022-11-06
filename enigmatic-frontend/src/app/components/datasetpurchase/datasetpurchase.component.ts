import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContractService, ContributorStruct } from 'src/app/services/contract.service';

@Component({
  selector: 'app-datasetpurchase',
  templateUrl: './datasetpurchase.component.html',
  styleUrls: ['./datasetpurchase.component.scss']
})
export class DatasetpurchaseComponent implements OnInit {

  contributorSize: Observable<number>;
  allContributors: Observable<ContributorStruct[]>;

  constructor(private contractService: ContractService) {
    this.contributorSize = contractService.getsizeOfContributors();
    this.allContributors = contractService.getAllContributors();
  }

  ngOnInit(): void {
  }

  purchaseDatasetClicked() {
    this.contractService.purchaseDataset();
  }

}
