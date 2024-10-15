import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { PositionMetricsComponent } from './position-metrics.component';

@NgModule({
  declarations: [PositionMetricsComponent],
  imports: [CommonModule, DecimalPipe],
  exports: [PositionMetricsComponent],
  providers: [],
})
export class PositionMetricsModule {}
