import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MetricBlockMobModule } from 'app/components/metric-blocks/metric-block-mob/metric-block-mob.module';
import { MetricBlockModule } from 'app/components/metric-blocks/metric-block/metric-block.module';
import { PHistoryMetricComponent } from './p-history-metric.component';

@NgModule({
  declarations: [PHistoryMetricComponent],
  imports: [CommonModule, MetricBlockModule, MetricBlockMobModule],
  exports: [PHistoryMetricComponent],
  providers: [],
})
export class PHistoryMetricModule {}
