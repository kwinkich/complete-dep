import { Component, Input } from '@angular/core';
import { TradePair } from 'app/interfaces/trade-pair';

@Component({
  selector: 'pair-item',
  templateUrl: './pair-item.component.html',
  styleUrls: ['./pair-item.component.scss'],
})
export class PairItemComponent {
  @Input() tradePairData!: TradePair;
}
