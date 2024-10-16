import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Candle } from 'app/interfaces/candle';
import { CandlesService } from 'app/services/candles/candles.service';
import { createChart, CrosshairMode } from 'lightweight-charts';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chart') chartEl: ElementRef | null = null;
  private conn: WebSocket | undefined;
  private intervalId: any; // Интервал для запросов на обновление свечи

  constructor(private _candlesService: CandlesService) {}

  public candles: Candle[] = []; // Change to an array
  public resizeObserver: ResizeObserver | undefined;
  public chart: any;
  public candlestickSeries: any;

  public chartOptions: any = {
    layout: {
      textColor: '#f6f4eb',
      background: { type: 'solid', color: '#00000a' },
    },
    grid: {
      vertLines: {
        color: 'rgba(256, 256, 256, 0.1)',
      },
      horzLines: {
        color: 'rgba(256, 256, 256, 0.1)',
      },
    },
    crosshair: {
      mode: CrosshairMode.Normal,
    },
    priceScale: {
      borderColor: '#485c7b',
    },
    timeScale: {
      borderColor: '#485158',
      timeVisible: true,
      secondVisible: false,
    },
  };

  ngOnInit() {
    // Получение начальных данных
    this._candlesService
      .getCandlesHistory('EQAOQdwdw8kGftJCSFgOErM1mBjYPe4DBPq8-AhF6vr9si5N')
      .subscribe({
        next: (res) => {
          const resdata = JSON.parse(JSON.stringify(res)); // Парсим данные
          const caldeData = resdata.data.map((c: any) => {
            // Создаём массив
            return {
              time: c.openTime / 1000,
              open: Number(c.open),
              high: Number(c.high),
              low: Number(c.low),
              close: Number(c.close || c.open),
            };
          });

          // // Удаляем дубликаты по времени, чтобы временные метки были уникальными
          // const uniqueCaldeData: Candle[] = Array.from(
          //   new Map<number, Candle>(
          //     caldeData.map((item: Candle) => [item.time, item])
          //   ).values()
          // );
          // // Сортируем данные по времени в порядке возрастания
          // uniqueCaldeData.sort((a: any, b: any) => a.time - b.time);
          // this.candles = uniqueCaldeData;
          this.candlestickSeries.setData(caldeData);
        },
        error: (error) => {
          console.error('Ошибка при получении данных о свечах:', error);
        },
        complete: () => {
          console.log('Получение данных о свечах завершено.');
        },
      });
    this.intervalId = setInterval(() => {
      this.fetchCandles();
    }, 2000);
  }

  fetchCandles() {
    this._candlesService
      .getCandles('EQAOQdwdw8kGftJCSFgOErM1mBjYPe4DBPq8-AhF6vr9si5N')
      .subscribe({
        next: (res: Candle) => {
          console.log(res);
          const editLiveData = {
            time: Number(res.openTime) / 1000,
            open: Number(res.open),
            high: Number(res.high),
            low: Number(res.low),
            close: Number(res.close || res.open),
          };

          this.candlestickSeries.update(editLiveData);
        },
        error: (error) => {
          console.error('Ошибка при получении данных о свечах:', error);
        },
        complete: () => {
          console.log('Получение данных о свечах завершено.');
        },
      });
  }

  ngAfterViewInit(): void {
    if (this.chartEl) {
      this.chart = createChart(this.chartEl.nativeElement, this.chartOptions);

      this.candlestickSeries = this.chart.addCandlestickSeries({
        upColor: '#bcfd4c',
        downColor: '#fd4c4c',
        borderDownColor: 'rgba(253, 76, 76, 0.8)',
        borderUpColor: '#698e2f',
        wickDownColor: 'rgba(253, 76, 76, 0.8)',
        wickUpColor: '#698e2f',
      });

      this.candlestickSeries.setData(this.candles); // Set initial data here

      this.resizeObserver = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        this.chart.applyOptions({ width, height });

        setTimeout(() => {
          this.chart.timeScale().fitContent();
        }, 0);
      });

      this.resizeObserver.observe(this.chartEl.nativeElement);
    }
  }

  initializeWebSocket(tradePair: string, currentTimeFrame: string) {
    const wsUrl = this._candlesService.GetLiveCandle(
      currentTimeFrame,
      tradePair
    );
    this.conn = new WebSocket(wsUrl);

    this.conn.onmessage = (event) => {
      const liveData = JSON.parse(event.data);
      const editLiveData = {
        time: liveData.k.t / 1000,
        open: parseFloat(liveData.k.o),
        high: parseFloat(liveData.k.h),
        low: parseFloat(liveData.k.l),
        close: parseFloat(liveData.k.c),
      };
      // Обновляем график
      this.candlestickSeries.update(editLiveData);
    };

    this.conn.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.conn.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.conn) {
      this.conn.close(); // Закрываем соединение при уничтожении компонента
    }
  }
}
