import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, firstValueFrom } from 'rxjs';
import {
  ConnectedWallet,
  TonConnectUIService,
} from 'tonconnect-ui-angular-fork';

@Injectable({
  providedIn: 'root',
})
export class WalletSService implements OnDestroy {
  constructor(private readonly _tonConnectUIService: TonConnectUIService) {}

  private walletSubject = new BehaviorSubject<ConnectedWallet | null>(null);
  public wallet$ = this.walletSubject.asObservable();
  private _walletSubscription!: Subscription;

  public initWallet(): void {
    this._walletSubscription = this._tonConnectUIService
      .getConnectedWallet()
      .subscribe((wallet) => {
        this.walletSubject.next(wallet);
      });
  }

  public connectWallet(): void {
    this._tonConnectUIService.get().subscribe((uiConnect) => {
      uiConnect.openModal();
    });
  }

  public async disconnectWallet(): Promise<void> {
    const uiDisconnect = await firstValueFrom(this._tonConnectUIService.get());
    uiDisconnect.disconnect();
    this.walletSubject.next(null);
  }

  ngOnDestroy(): void {
    this._walletSubscription?.unsubscribe();
  }
}
