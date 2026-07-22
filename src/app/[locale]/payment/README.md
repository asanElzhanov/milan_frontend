# Payment Pages

## Routes

- `/:locale/payment/:orderNumber` — страница оплаты заказа (FreedomPay).
- `/:locale/payment/success` — landing после успешной оплаты (`pg_success_url`).
- `/:locale/payment/fail` — landing после неуспешной оплаты (`pg_failure_url`).
- `/:locale/payment/pending` — статус ожидания.

Locales are validated through the shared locale config.

## Payment Start

Страница оплаты стартует платёж единственным способом — FreedomPay:

- `POST /api/v1/payments/freedom/create/`

Backend возвращает `redirect_url` (страница FreedomPay). Редирект выполняется только для
безопасного `https://` URL.

## Payment Status

Страница поллит `GET /api/v1/payments/freedom/status/` каждые 5 секунд и обновляет карточку
статуса (pending / success / fail). Источник истины — статус заказа на backend, который
меняется серверным callback'ом FreedomPay (`result_url`).

## Redirect Handling

External payment URLs must be `https://`. Empty, `javascript:`, and protocol-relative URLs are
rejected.
