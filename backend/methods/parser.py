#COPY
import asyncio
import json
import os
from datetime import datetime, timedelta

import pytz
from methods.get_floor import get_nft_collection_floor

os.environ['TZ'] = 'Europe/Moscow'
timezone = pytz.timezone('Europe/Moscow')

now = datetime.now(timezone)
close_time = (now + timedelta(hours=1)).replace(minute=0, second=0, microsecond=0)
open_time = now.replace(minute=0, second=0, microsecond=0)

prices = []
close_price = None
isClose = False
#now = datetime.now()
#close_time = (now + timedelta(minutes=5)).replace(minute=0, second=0, microsecond=0)
#open_time = now.replace(second=0, microsecond=0)
prices = []  

def set_timezone():
    # Устанавливаем временную зону с использованием pytz
    timezone = pytz.timezone('Europe/Moscow')
    now = datetime.now(timezone)
    print(f'Current time in Europe/Moscow timezone: {now}')


def get_time_hour(address):
    global open_time_hour, close_time_hour, prices
    # Обновление текущего времени с учетом временной зоны
    now = datetime.now(timezone)

    if len(prices) > 0 and close_time_hour <= now.replace(minute=0, second=0, microsecond=0):
        filename = f'./candles/candleHistory{address}.json'
        if os.path.exists(filename): 
            with open(filename, 'r+') as json_file:
                json_data = json.load(json_file)
        else:
            json_data = {"data": []}

        data = {
            'openTime': int(open_time_hour.timestamp() * 1000),
            'closeTime': int(close_time_hour.timestamp() * 1000),
            'percentChangePrice': percentChange(),
            'currentPrice': prices[-1],
            'open': prices[0],
            'high': max(prices),
            'low': min(prices),
            'close': prices[-1],
        }
        # Добавляем новые данные в список "data"
        json_data["data"].append(data)
        # Записываем обновленные данные в файл
        with open(filename, 'w+') as json_file:
            json.dump(json_data, json_file, indent=4)
        print(f"File \033[96mcandlesANON\033[0m.json updated, request amount: {len(prices)}")
        prices.clear()

        # Обновление close_time и open_time с учетом временной зоны
        close_time = (now + timedelta(hours=1)).replace(minute=0, second=0, microsecond=0)
        open_time = now.replace(minute=0, second=0, microsecond=0)

    print(f'\033[92m close time hour: {close_time_hour} \033[0m')
    return open_time, close_time


async def getPrice(address):
    print(f'Fetching price for address: {address}')
    result = await get_nft_collection_floor(address)
    if result is None:
        if prices:
            last_price = prices[-1]
            print(f'\033[93m Price is None, returning last available price: {last_price} \033[0m')
            return last_price
        else:
            print('\033[91m Price is None and no previous price available. \033[0m')
            return None
    else:
        prices.append(result)
        print(f'\033[92m Price fetched: {result} \033[0m')
        return result

def percentChange():
    if len(prices) < 2:
        return 0
    return ((prices[-1] - prices[0]) / (prices[0] + prices[-1] / 2)) * 100

async def writeFloorInFile(data, address):
    with open(f'./candles/candles{address}.json', 'w+', encoding='utf8') as file:
        json.dump(data, file, ensure_ascii=False, indent=2)
        print(f"File \033[96mcandles{address}\033[0m.json updated, request amount: {len(prices)}")
        file.write('\n')

async def getData(address):
    while True:
        try:
            data = {
                'openTime': int(get_time_hour(address)[0].timestamp() * 1000),
                'closeTime': int(get_time_hour(address)[1].timestamp() * 1000),
                'percentChangePrice': percentChange(),
                'currentPrice': await getPrice(address),
                'open': prices[0],
                'high': max(prices),
                'low': min(prices),
                'close': prices[-1],
            }
            print(f'\033[93m Collected data: {data} \033[0m')
            if data:
                await writeFloorInFile(data, address)
        except Exception as e:
            print(f"Bro, eto oshibka bro: {e}")
        await asyncio.sleep(5)

async def main(address):
    set_timezone()
    print('Starting main function')
    await getData(address)

if __name__ == "__main__":
    address = "EQAOQdwdw8kGftJCSFgOErM1mBjYPe4DBPq8-AhF6vr9si5N"
    asyncio.run(main(address))
