import { Position } from 'app/interfaces/position';
import { UtilsService } from 'app/utils/utils.service';
import * as currency from 'currency.js';

describe('Take Profit расчеты', () => {
  let utilsService: UtilsService;
  let position: Position;

  beforeEach(() => {
    utilsService = new UtilsService();
    position = {
      PositionType: 'Long',
      PriceType: 'Market',
      EntryPrice: currency(34.38).value,
      Margin: currency(0).value,
      Amount: currency(0).value,
      Leverage: 17,
      PositionSize: currency(0).value,
      TakeProfit: currency(0).value,
      StopLoss: currency(0).value,
      TakeProfitPercent: currency(0).value,
      StopLossPercent: currency(0).value,
      TakeProfitAmount: currency(0).value,
      StopLossAmount: currency(0).value,
      Liquidation: currency(0).value,
      Commission: currency(0.002, { precision: 4 }).value,
      Fees: currency(0).value,
    };
  });

  it('Конвертация процентов в цену. Процент = 0', () => {
    utilsService.calculateTakeProfitPercent(position, 0);
    expect(position.TakeProfit).toBe(0);
  });

  it('Конвертация процентов в цену. Некорректное значение у типа позиции', () => {
    position.PositionType = 'Non Correct';
    utilsService.calculateTakeProfitPercent(position, 20);

    expect(position.TakeProfit).toBe(0);
  });

  it('Конвертация процентов в цену. TakeProfitPercent = undefined || NaN', () => {
    let newTakeProfitPercent = undefined;
    utilsService.calculateTakeProfitPercent(
      position,
      Number(newTakeProfitPercent)
    );

    expect(position.TakeProfitPercent).toBe(0);
    expect(position.TakeProfit).toBe(0);
  });

  it('Конвертация процентов в цену (LONG)', () => {
    utilsService.calculateTakeProfitPercent(position, 20);
    expect(position.TakeProfit).toBe(34.7845);
  });

  it('Конвертация процентов в цену (SHORT)', () => {
    position.PositionType = 'Short';
    utilsService.calculateTakeProfitPercent(position, 20);

    expect(position.TakeProfit).toBe(33.9755);
  });

  it('Конвертация цены в проценты. Цена = 0', () => {
    const { errors } = utilsService.calculateTakeProfitPrice(position, 0);
    expect(errors.minimalAvailableTakeProfit).toBe(true);
    expect(position.TakeProfitPercent).toBe(0);
  });

  it('Конвертация цены в проценты. Некорректное значение у типа позиции', () => {
    position.PositionType = 'Non Correct';
    utilsService.calculateTakeProfitPrice(position, 20);

    expect(position.TakeProfitPercent).toBe(0);
  });

  it('Конвертация цены в проценты. TakeProfitPrice = undefined || NaN', () => {
    let newTakeProfitPrice = undefined;
    utilsService.calculateTakeProfitPrice(position, Number(newTakeProfitPrice));

    expect(position.TakeProfit).toBe(0);
    expect(position.TakeProfitPercent).toBe(0);
  });

  it('Конвертация цены в проценты (LONG)', () => {
    utilsService.calculateTakeProfitPrice(position, 34.7845);
    expect(position.TakeProfitPercent).toBe(20);
  });

  it('Конвертация цены в проценты. Цена больше в процентах больше чем 200 (LONG)', () => {
    utilsService.calculateTakeProfitPrice(position, 100);
    expect(position.TakeProfit).toBe(38.4247);
    expect(position.TakeProfitPercent).toBe(200);
  });

  it('Конвертация цены в проценты. Цена меньше, чем ТВX (LONG)', () => {
    const { errors } = utilsService.calculateTakeProfitPrice(position, 30);
    expect(errors.takeProfitMore).toBe(true);
    expect(position.TakeProfit).toBe(30);
    expect(position.TakeProfitPercent).toBe(0);
  });

  it('Конвертация цены в проценты (SHORT)', () => {
    position.PositionType = 'Short';
    utilsService.calculateTakeProfitPrice(position, 33.9755);

    expect(position.TakeProfitPercent).toBe(20);
  });

  it('Конвертация цены в проценты. Цена больше в процентах больше чем 200 (SHORT)', () => {
    position.PositionType = 'Short';
    utilsService.calculateTakeProfitPrice(position, 12);
    expect(position.TakeProfit).toBe(30.3353);
    expect(position.TakeProfitPercent).toBe(200);
  });

  it('Конвертация цены в проценты. Цена Больше, чем ТВX (SHORT)', () => {
    position.PositionType = 'Short';
    const { errors } = utilsService.calculateTakeProfitPrice(position, 35);
    expect(errors.takeProfitLess).toBe(true);
    expect(position.TakeProfit).toBe(35);
    expect(position.TakeProfitPercent).toBe(0);
  });

  it('Расчет прибыли (LONG)', () => {
    position.EntryPrice = 100;
    position.Margin = 83.3;
    position.Leverage = 5;
    position.TakeProfit = 125;
    position.TakeProfitPercent = 125;

    utilsService.calculateTakeProfitAmount(position);
    expect(position.TakeProfitAmount).toBe(103.9168);
  });

  it('Расчет прибыли (SHORT)', () => {
    position.PositionType = 'Short';
    position.EntryPrice = 100;
    position.Margin = 83.3;
    position.Leverage = 5;
    position.TakeProfit = 75;
    position.TakeProfitPercent = 125;

    utilsService.calculateTakeProfitAmount(position);
    expect(position.TakeProfitAmount).toBe(103.9168);
  });

  it('Расчет прибыли. Некорректный тип позиции', () => {
    position.PositionType = 'Non Correct';
    position.EntryPrice = 100;
    position.Margin = 83.3;
    position.Leverage = 5;
    position.TakeProfit = 75;
    position.TakeProfitPercent = 125;

    utilsService.calculateTakeProfitAmount(position);
    expect(position.TakeProfitAmount).toBe(0);
  });
});

describe('Stop Loss расчеты', () => {
  let utilsService: UtilsService;
  let position: Position;

  beforeEach(() => {
    utilsService = new UtilsService();
    position = {
      PositionType: 'Long',
      PriceType: 'Market',
      EntryPrice: currency(34.38).value,
      Margin: currency(0).value,
      Amount: currency(0).value,
      Leverage: 17,
      PositionSize: currency(0).value,
      TakeProfit: currency(0).value,
      StopLoss: currency(0).value,
      TakeProfitPercent: currency(0).value,
      StopLossPercent: currency(0).value,
      TakeProfitAmount: currency(0).value,
      StopLossAmount: currency(0).value,
      Liquidation: currency(0).value,
      Commission: currency(0.002, { precision: 4 }).value,
      Fees: currency(0).value,
    };
  });

  it('Конвертация процентов в цену. Процент = 0', () => {
    utilsService.calculateStopLossPercent(position, 0);
    expect(position.StopLoss).toBe(0);
  });

  it('Конвертация процентов в цену. Некорректное значение у типа позиции', () => {
    position.PositionType = 'Non Correct';
    utilsService.calculateStopLossPercent(position, 20);

    expect(position.StopLoss).toBe(0);
  });

  it('Конвертация процентов в цену. StopLossPercent = undefined || NaN', () => {
    let newStopLossPercent = undefined;
    utilsService.calculateStopLossPercent(position, Number(newStopLossPercent));

    expect(position.StopLossPercent).toBe(0);
    expect(position.StopLoss).toBe(0);
  });

  it('Конвертация процентов в цену (LONG)', () => {
    utilsService.calculateStopLossPercent(position, 20);
    expect(position.StopLoss).toBe(33.9755);
  });

  it('Конвертация процентов в цену (SHORT)', () => {
    position.PositionType = 'Short';
    utilsService.calculateStopLossPercent(position, 20);

    expect(position.StopLoss).toBe(34.7845);
  });

  it('Конвертация цены в проценты. Цена = 0', () => {
    const { errorsStopLoss } = utilsService.calculateStopLossPrice(position, 0);
    expect(errorsStopLoss.minimalAvailableStopLoss).toBe(true);
    expect(position.StopLossPercent).toBe(0);
  });

  it('Конвертация цены в проценты. Некорректное значение у типа позиции', () => {
    position.PositionType = 'Non Correct';
    utilsService.calculateStopLossPrice(position, 20);

    expect(position.StopLossPercent).toBe(0);
  });

  it('Конвертация цены в проценты. StopLossPrice = undefined || NaN', () => {
    let newStopLossPrice = undefined;
    utilsService.calculateStopLossPrice(position, Number(newStopLossPrice));

    expect(position.StopLoss).toBe(0);
    expect(position.StopLossPercent).toBe(0);
  });

  it('Конвертация цены в проценты (LONG)', () => {
    utilsService.calculateStopLossPrice(position, 33.9755);
    expect(position.StopLossPercent).toBe(20);
  });

  it('Конвертация цены в проценты. Цена больше в процентах больше чем 100 (LONG)', () => {
    utilsService.calculateStopLossPrice(position, 10);
    expect(position.StopLoss).toBe(32.3576);
    expect(position.StopLossPercent).toBe(100);
  });

  it('Конвертация цены в проценты. Цена больше, чем ТВX (LONG)', () => {
    const { errorsStopLoss } = utilsService.calculateStopLossPrice(
      position,
      35
    );
    expect(errorsStopLoss.stopLossMore).toBe(true);
    expect(position.StopLoss).toBe(35);
    expect(position.StopLossPercent).toBe(0);
  });

  it('Конвертация цены в проценты (SHORT)', () => {
    position.PositionType = 'Short';
    utilsService.calculateStopLossPrice(position, 34.7845);

    expect(position.StopLossPercent).toBe(20);
  });

  it('Конвертация цены в проценты. Цена больше в процентах больше чем 100 (SHORT)', () => {
    position.PositionType = 'Short';
    utilsService.calculateStopLossPrice(position, 36.5);
    expect(position.StopLoss).toBe(36.4024);
    expect(position.StopLossPercent).toBe(100);
  });

  it('Конвертация цены в проценты. Цена меньше, чем ТВX (SHORT)', () => {
    position.PositionType = 'Short';
    const { errorsStopLoss } = utilsService.calculateStopLossPrice(
      position,
      31
    );
    expect(errorsStopLoss.stopLossLess).toBe(true);
    expect(position.StopLoss).toBe(31);
    expect(position.StopLossPercent).toBe(0);
  });

  it('Расчет убытка (LONG)', () => {
    position.EntryPrice = 100;
    position.Margin = 83.3;
    position.Leverage = 5;
    position.StopLoss = 92.3;
    position.StopLossPercent = 38.5;
    position.PositionSize = 83.3 * 5;

    utilsService.calculateStopLossAmount(position);
    expect(position.StopLossAmount).toBe(32.0622);
  });

  it('Расчет убытка (SHORT)', () => {
    position.PositionType = 'Short';
    position.EntryPrice = 100;
    position.Margin = 83.3;
    position.Leverage = 5;
    position.StopLoss = 107.7;
    position.StopLossPercent = 38.5;
    position.PositionSize = 83.3 * 5;

    utilsService.calculateStopLossAmount(position);
    expect(position.StopLossAmount).toBe(32.0622);
  });

  it('Расчет убытка. Некорректный тип позиции', () => {
    position.PositionType = 'Non Correct';
    position.EntryPrice = 100;
    position.Margin = 83.3;
    position.Leverage = 5;
    position.StopLoss = 107.7;
    position.StopLossPercent = 38.5;
    position.PositionSize = 83.3 * 5;

    utilsService.calculateStopLossAmount(position);
    expect(position.StopLossAmount).toBe(0);
  });
});

describe('Position Fees рассчеты', () => {
  let utilsService: UtilsService;
  let position: Position;

  beforeEach(() => {
    utilsService = new UtilsService();
    position = {
      PositionType: 'Long',
      PriceType: 'Market',
      EntryPrice: currency(100).value,
      Margin: currency(83.3).value,
      Amount: currency(0).value,
      Leverage: 17,
      PositionSize: currency(1416.1).value,
      TakeProfit: currency(0).value,
      StopLoss: currency(0).value,
      TakeProfitPercent: currency(0).value,
      StopLossPercent: currency(0).value,
      TakeProfitAmount: currency(0).value,
      StopLossAmount: currency(0).value,
      Liquidation: currency(0).value,
      Commission: currency(0.002, { precision: 4 }).value,
      Fees: currency(0).value,
    };
  });

  it('Расчет комиссии за открытие', () => {
    utilsService.calculatePositionFees(position);
    expect(position.Fees).toBe(2.8322);
  });
});

describe('Liquidation Price рассчеты', () => {
  let utilsService: UtilsService;
  let position: Position;

  beforeEach(() => {
    utilsService = new UtilsService();
    position = {
      PositionType: 'Long',
      PriceType: 'Market',
      EntryPrice: currency(100).value,
      Margin: currency(83.3).value,
      Amount: currency(0).value,
      Leverage: 17,
      PositionSize: currency(1416.1).value,
      TakeProfit: currency(0).value,
      StopLoss: currency(0).value,
      TakeProfitPercent: currency(0).value,
      StopLossPercent: currency(0).value,
      TakeProfitAmount: currency(0).value,
      StopLossAmount: currency(0).value,
      Liquidation: currency(0).value,
      Commission: currency(0.002, { precision: 4 }).value,
      Fees: currency(0).value,
    };
  });

  it('Расчет цены ликвидации (LONG)', () => {
    utilsService.calculateLiquidationPrice(position);
    expect(position.Liquidation).toBe(95.6175);
  });

  it('Расчет цены ликвидации (SHORT)', () => {
    position.PositionType = 'Short';
    utilsService.calculateLiquidationPrice(position);
    expect(position.Liquidation).toBe(104.3825);
  });

  it('Расчет цены ликвидации. Некорректный тип позиции', () => {
    position.PositionType = 'Non Correct';
    utilsService.calculateLiquidationPrice(position);
    expect(position.Liquidation).toBe(0);
  });
});

describe('Position Size рассчеты', () => {
  let utilsService: UtilsService;
  let position: Position;

  beforeEach(() => {
    utilsService = new UtilsService();
    position = {
      PositionType: 'Long',
      PriceType: 'Market',
      EntryPrice: currency(100).value,
      Margin: currency(83.3).value,
      Amount: currency(0).value,
      Leverage: 17,
      PositionSize: currency(1416.1).value,
      TakeProfit: currency(0).value,
      StopLoss: currency(0).value,
      TakeProfitPercent: currency(0).value,
      StopLossPercent: currency(0).value,
      TakeProfitAmount: currency(0).value,
      StopLossAmount: currency(0).value,
      Liquidation: currency(0).value,
      Commission: currency(0.002, { precision: 4 }).value,
      Fees: currency(0).value,
    };
  });

  it('Расчет объема позиции ', () => {
    utilsService.calculatePositionSize(position);
    expect(position.PositionSize).toBe(1416.1);
  });
});
