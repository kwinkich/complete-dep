import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonConnectModule } from '../buttons/button-connect/button-connect.module';
import { SwitchPositionModule } from '../position-control/switch-position/switch-position.module';
import { SwitcherSectionModule } from '../switcher-section/switcher-section.module';
import { OHistoryItemModule } from './po-items/o-history-item/o-history-item.module';
import { OOpenItemModule } from './po-items/o-open-item/o-open-item.module';
import { PHistoryItemModule } from './po-items/p-history-item/p-history-item.module';
import { POpenItemModule } from './po-items/p-open-item/p-open-item.module';
import { PositionOrderComponent } from './position-order.component';
import { OOpenMetricComponent } from './po-items/po-metrics/o-open-metric/o-open-metric.component';
import { OHistoryMetricComponent } from './po-items/po-metrics/o-history-metric/o-history-metric.component';

@NgModule({
  declarations: [PositionOrderComponent],
  imports: [
    CommonModule,
    ButtonConnectModule,
    SwitchPositionModule,
    SwitcherSectionModule,
    POpenItemModule,
    PHistoryItemModule,
    OOpenItemModule,
    OHistoryItemModule,
  ],
  exports: [PositionOrderComponent],
  providers: [],
})
export class PositionOrderModule {}
