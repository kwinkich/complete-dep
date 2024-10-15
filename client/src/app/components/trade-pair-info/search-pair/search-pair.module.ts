import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PairItemModule } from './pair-item/pair-item.module';
import { SearchPairComponent } from './search-pair.component';
import { SwitcherSectionModule } from '../../switcher-section/switcher-section.module';

@NgModule({
  declarations: [SearchPairComponent],
  imports: [CommonModule, PairItemModule, SwitcherSectionModule],
  exports: [SearchPairComponent],
  providers: [],
})
export class SearchPairModule {}
