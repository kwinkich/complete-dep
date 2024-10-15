import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candle } from 'app/interfaces/candle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandlesService {
  // private baseUrl = 'http://92.205.129.142:70'; // Тут будет ссылка на серверную часть
  private baseUrl = 'http://127.0.0.1:5000'; // Тут будет ссылка на серверную часть
  constructor(private _http: HttpClient) {}

  // Функция для получения истории свечей

  public getCandlesHistory(
    tradePair: string // Краткое название торговой пары (BITCOINUSDT -> BTCUSDT)
  ): Observable<Candle[]> {
    return this._http.get<Candle[]>(
      `${this.baseUrl}/dyweapi/v1/getHistory/${tradePair}`
    );
  }

  public getCandles(
    tradePair: string, // Краткое название торговой пары (BITCOINUSDT -> BTCUSDT)
    currentTimeFrame: string // Текущий тайм-фрейм (1m, 10m, 15m, etc.)
  ): Observable<Candle> {
    return this._http.get<Candle>(
      `${this.baseUrl}/dyweapi/v1/getData/${tradePair}`
    );
  }

  public GetLiveCandle(currentTimeFrame: string, currentCoin: string) {
    let symbol_LowerCase = currentCoin.toLowerCase();
    return (
      'wss://stream.binance.com:9443/ws/' +
      symbol_LowerCase +
      '@kline_' +
      currentTimeFrame
    );
  }

  public unixToDate(unix: number) {
    const milliseconds = unix;
    const dateObject = new Date(milliseconds);
    const humanDateFormat = dateObject.toLocaleString();
    return humanDateFormat;
  }
}
