import { Component, ElementRef, ViewChild } from '@angular/core';
import { VisibilityService } from 'app/utils/click-outside.service';

@Component({
  selector: 'trade-pair-info',
  templateUrl: './trade-pair-info.component.html',
  styleUrls: ['./trade-pair-info.component.scss'],
})
export class TradePairInfoComponent {
  @ViewChild('pairSelect') pairSelect: ElementRef | null = null;
  @ViewChild('pairSelectMenu') pairSelectMenu: ElementRef | null = null;

  constructor(public _visibilityService: VisibilityService) {}

  public toggleSelectTradePair() {
    if (this.pairSelect && this.pairSelectMenu) {
      this._visibilityService.manageVisibility(
        this.pairSelect.nativeElement,
        this.pairSelectMenu.nativeElement,
        true
      );
    }
  }
}
