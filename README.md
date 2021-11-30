<p align="center">
    <img src="https://img.shields.io/badge/express-4.17.1-green" />
    <img src="https://img.shields.io/badge/node-16.0.0-blue" />
    <img src="https://img.shields.io/badge/sass-1.42.1-ff96b4" />
    <img src="https://img.shields.io/badge/typescript-4-blue" />
    <img src="https://img.shields.io/badge/mocha-8-8d6748" />
    <img src="https://img.shields.io/badge/webpack-5-5199c8" />
</p>

# Чат
Приложение "Мессенджер". Разрабатывается в рамках первого модуля Яндекс.Практикума. Профессия "Мидл фронтенд-разработчик"
В разработке используется только JavaScript, Typescript, CSS и API браузера (никаких библиотек и фреймворков)

Для сбоки компонентов используется собственные шаблонизатор, который генерирует DOMElement. 

Сборщик - Webpack (используется собственный лоадер для шаблонизатора)

Препроцессор - sass

Тесты - mocha

## Реализованный функционал
* добавление чатов
* создание/редактирование пользователей
* добавление/удаление пользователей из чата
* обмен сообщениями в чате

## Установка пакетов
```npn instal``` - установка пакетов

```npn ci``` - установка пакетов с использованием `package-lock.json` (актуальное и безопасное состояние)

## Запуск приложения

```npn dev``` - запуск dev сервера на http://localhost:3000

```npn start``` - запускается сборка приложения с помощью Webpack, после чего статические файлы раздаются через express на http://localhost:3000

```npn build``` - сборка приложения в папку `/dist`

```npn lint``` - проверка синтаксиса (eslint, stylelint)

```npn fix``` - исправление ошибок синтаксиса (eslint, stylelint)

```npn test``` - запуск тестов для шаблонизатора, роутера, компонента (Кнопка), модуля отправки запросов, утилиты getObjectVal

## Автодеплой
Проект выложен на Heroku, настроен автодеплой Docker-сборки из ветки ``deploy``

Адрес приложения [https://mesenger-app.herokuapp.com/](https://mesenger-app.herokuapp.com/)

## Прекоммит
Настроен прекоммит husky (lint $$ test)

## Макет приложения
[figma](https://www.figma.com/file/ygSAtfKL50oDjm50mvXeXx/my-chat)

## Pull requests
- [Sprint 4](https://github.com/anikinaa/middle.messenger.praktikum.yandex/pull/5)
