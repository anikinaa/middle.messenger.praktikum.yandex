<p align="center">
    <img src="https://img.shields.io/badge/express-4.17.1-green" />
    <img src="https://img.shields.io/badge/node-16.0.0-blue" />
    <img src="https://img.shields.io/badge/parcelBundler-1.4.1-orange" />
    <img src="https://img.shields.io/badge/sass-1.42.1-ff96b4" />
</p>

# Чат
Приложение "Мессенджер". Разрабатывается в рамках первого модуля Яндекс.Практикума. Профессия "Мидл фронтенд-разработчик"
В разработке используется только JavaScript, Typescript, CSS и API браузера (никаких библиотек и фреймворков)

Для сбоки компонентов используется собственные шаблонизатор, который генерирует DOMElement. 

Сборщик - Parcel

Шаблонизатор - статика handlebars, компоненты - собственный

Препроцессор - sass

## Реализованный функционал
* добавление чатов
* создание/редактирование пользователей
* добавление/удаление пользователей из чата
* обмен сообщениями в чате

## Установка пакетов
```npn instal```

## Запуск приложения

```npn start``` - запускается сборка приложения с помощью Parcel, после чего статические файлы раздаются через express

```npn build``` - сборка приложения

```npn lint``` - проверка синтаксиса

```npn fix``` - исправление ошибок синтаксиса

```npn test``` - запуск тестов для шаблонизатора, роутера, компонента (Кнопка), модуля отправки запросов 

Приложение доступно по адресу [http://localhost:3000/](http://localhost:3000/)

## Автодеплой
Проект выложен на Netlify, настроен автодеплой из ветки ``deploy``

Адрес приложения [https://musing-pare-chat.netlify.app/](https://musing-pare-chat.netlify.app/)

## Макет приложения
[figma](https://www.figma.com/file/ygSAtfKL50oDjm50mvXeXx/my-chat)

## Pull requests
- [Sprint 3](https://github.com/anikinaa/middle.messenger.praktikum.yandex/pull/4)
