import { Component, Input } from '@angular/core';

@Component({
  selector: 'trade-pair-metrics',
  templateUrl: './trade-pair-metrics.component.html',
  styleUrls: ['./trade-pair-metrics.component.scss'],
})
export class TradePairMetricsComponent {
  @Input() price: number = 0;
  @Input() percentChange: number = 0;
  @Input() volume: number = 0;
  @Input() priceMax: number = 0;
  @Input() priceMin: number = 0;
  @Input() funding: number = 0;
  @Input() fundingTime: number = 0;
  @Input() openInterestL: number = 0;
  @Input() openInterestS: number = 0;
}
