# Product Review Feature

## Purpose and product detail integration

`ProductReviewsSection` renders the public review summary, paginated list, loading/error/empty
states, and the authenticated review form.

## Auth behavior and create review form

Reading is public. Guests get a login link with a product callback. Signed-in users can submit a
1–5 rating and required comment, with up to five optional image/video files. Submission uses JSON
without files and multipart with repeated `media` fields when files are selected. Mock mode never
pretends that submission succeeded.

## Moderation status and eligibility

After success the form is cleared and queries are invalidated; the created review is not inserted
into the public list before backend moderation. The frontend narrows the form to paid/completed
orders containing the product, while the backend remains the source of truth and validates every
submission.

## What is intentionally not included

Local review storage, fake reviews, edit/delete, and moderation/admin tooling.
