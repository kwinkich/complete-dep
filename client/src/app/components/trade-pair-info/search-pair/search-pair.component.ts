import { Component, Input } from '@angular/core';
import { VisibilityService } from 'app/utils/click-outside.service';

@Component({
  selector: 'search-pair',
  templateUrl: './search-pair.component.html',
  styleUrls: ['./search-pair.component.scss'],
})
export class SearchPairComponent {
  @Input() pairSelect: HTMLDivElement | null = null;
  @Input() pairSelectMenu: HTMLDivElement | null = null;
  public sections: { id: string; name: string }[] = [
    {
      id: 'favorites',
      name: 'Favorites',
    },
    {
      id: 'all',
      name: 'All',
    },
  ];
  public activeSection: string = 'all';
  public currencyType: string = 'ton';

  constructor(public _visibilityService: VisibilityService) {}

  public toggleSelectTradePair() {
    if (this.pairSelect && this.pairSelectMenu) {
      this._visibilityService.manageVisibility(
        this.pairSelect,
        this.pairSelectMenu,
        true
      );
    }
  }

  public toggleSection(section: string) {
    this.activeSection = section;
  }

  public toggleCurrencyType(currency: string) {
    this.currencyType = currency;
  }
}
