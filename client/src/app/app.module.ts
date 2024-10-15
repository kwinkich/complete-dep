// app.module.ts
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { of } from 'rxjs';
import {
  TON_CONNECT_UI_OPTIONS,
  TonConnectUIModule,
} from 'tonconnect-ui-angular-fork';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TradeModule } from './pages/trade/trade.module';
import { LanguageService } from './services/language/language.service';
import { WalletSService } from './services/walletService/wallet-s.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TradeModule,
    TonConnectUIModule.forRoot({
      options: {
        provide: TON_CONNECT_UI_OPTIONS,
        useValue: of({
          manifestUrl: `https://raw.githubusercontent.com/kwinkich/dywe-manifest/refs/heads/main/manifest.json`,
          restoreConnection: true,
          actionsConfiguration: {
            modals: 'all',
            notifications: 'all',
          },
        }),
      },
    }),
  ],
  providers: [WalletSService, LanguageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
