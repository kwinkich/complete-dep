# Этап сборки: установка Node.js и установка зависимостей
FROM node:22 AS build

# Установим рабочую директорию
WORKDIR /app

# Скопируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./
COPY angular.json ./
COPY tsconfig.app.json ./
COPY tsconfig.json ./

RUN npm install -g @angular/cli

# Установим зависимости
RUN npm install

# Скопируем исходный код приложения
COPY . .

CMD ["ng", "s", "--host", "0.0.0.0", "--port", "4200", "--disable-host-check"]
