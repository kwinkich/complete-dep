import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradeComponent } from './pages/trade/trade.component';

const routes: Routes = [
  { path: '', redirectTo: 'trade', pathMatch: 'full' },
  { path: 'trade', component: TradeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
