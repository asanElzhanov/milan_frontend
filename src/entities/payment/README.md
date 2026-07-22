# Payment Entity

## Purpose

`src/entities/payment` contains payment types, adapters, selectors, query keys, API methods, and
React Query hooks. It keeps the FreedomPay integration behind the backend contract.

## Supported Endpoints

- `POST /api/v1/payments/freedom/create/` — инициирует платёж, возвращает `redirect_url`.
- `GET /api/v1/payments/freedom/status/?order_number=&email=` — текущий статус заказа/оплаты.

## API Methods

- `paymentApi.startPayment(payload)`
  - Постит `order_number`, `email?`, `locale?` на FreedomPay create endpoint.
  - Возвращает `PaymentSession` c `redirectUrl`/`paymentUrl`.
  - Бросает читаемую ошибку в mock-режиме.
- `paymentApi.getPaymentStatus(orderNumber, email?)`
  - Возвращает нормализованный `PaymentStatusResult` из status endpoint.

## Status Handling

Status helpers normalize known values:

- `paid`, `success`, `completed` → paid.
- `failed`, `error`, `cancelled`, `expired` → failed.
- `pending`, `created`, `processing`, `requires_action`, `waiting`, `unpaid` → pending.

Adapters parse unknown payloads safely and support common wrappers such as `payment`, `session`,
`data`, `data.payment`, and `data.session`.

## Flow

1. Кнопка «Оплатить онлайн» → `startPayment` → редирект на страницу FreedomPay.
2. FreedomPay серверно вызывает backend `result_url` и меняет статус заказа.
3. Страница оплаты поллит `getPaymentStatus` (каждые 5с) и показывает актуальный статус.
