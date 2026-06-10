# UI Kit

## 1. Principles

- Reusable primitives.
- Accessible by default where possible.
- Styled with the Sara Milan theme.
- No business logic.
- No API calls.

## 2. Components

- Alert
- Badge
- Breadcrumbs
- Button
- Checkbox
- Container
- Dialog
- Drawer
- EmptyState
- Input
- Modal
- Pagination
- Price
- Radio
- SectionTitle
- Select
- Skeleton
- Tabs
- Textarea

## 3. Usage

```tsx
import { Button, Input, Price } from '@/shared/ui';
```

## 4. Rules

- Do not use product, order, cart, or user business types in `shared/ui`.
- Do not make API calls from UI Kit components.
- Do not use Zustand or React Query in UI Kit components.
- Do not add page-specific styling to shared primitives.
