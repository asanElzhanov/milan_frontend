# Product Review Feature

## Purpose and product detail integration

`ProductReviewsSection` replaces the old read-only preview. It reuses clean server initial data,
then refreshes through React Query and renders summary, list, loading/error/empty states, and form.

## Auth behavior and create review form

Reading is public. Guests get a login link with a product callback. Signed-in users can submit a
1–5 rating and required comment plus optional title, advantages, and disadvantages. Mock mode never
pretends that submission succeeded.

## Moderation status and eligibility

After success the form is cleared and queries are invalidated; the created review is not locally
inserted. Moderation state comes only from backend. Eligibility is backend-controlled; frontend
does not fake purchase verification, and submit rejection is displayed as an API error.

## What is intentionally not included

Local review storage, fake reviews, purchase heuristics, and moderation/admin tooling.
