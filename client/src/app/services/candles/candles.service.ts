import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candle } from 'app/interfaces/candle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandlesService {
  private baseUrl = 'http://localhost:5000'; // Тут будет ссылка на серверную часть
  constructor(private _http: HttpClient) {}

  // Функция для получения истории свечей
  public getCandlesHistory(
    collectionAddr: string // Адресс коллекции
  ): Observable<Candle[]> {
    return this._http.get<Candle[]>(
      `${this.baseUrl}/dyweapi/v1/getHistory/${collectionAddr}`
    );
  }

  public getCandles(
    collectionAddr: string // Адресс коллекции
  ): Observable<Candle> {
    return this._http.get<Candle>(
      `${this.baseUrl}/dyweapi/v1/getData/${collectionAddr}`
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
