# Next Session Handoff — list3d

**Last updated:** 2026-09-30

## Summary
list3d is a greenfield project for a lightweight 3D printing order and settlement tracker. **No code has been written yet.** The directory is empty apart from this file, and it is not a git repo. Planning is done: the high-level MVP plan and a detailed plan for the first build step both exist.

The user tried to approve twice by typing "yes" into the ExitPlanMode reject box, which recorded "don't proceed" both times, so nothing was implemented. Plan mode has since been exited, and the user asked for implementation to start.

## Current Project Goal
Build the **main order screen MVP**:
- header with a "Share link" button that does nothing yet
- summary: gross total, delivered value, item count, delivered item count
- add/edit item form with validation
- item list grouped by category, with edit and delete per item

State is local/mock only, behind a repository seam so persistence can be added later.

## Important Decisions That Must Not Be Broken
- **Stack:** Next.js (App Router, `src/`) + TypeScript + Tailwind + Vitest. This was the user's choice.
- **Item statuses:** `quoted | approved | in_production | ready | delivered`. Only `delivered` counts toward delivered value.
- **Money:** always integer cents, formatted as BRL with `Intl` pt-BR. Never floats.
- **Derived values** (subtotal, totals, counts, balances) are pure computed functions and are never stored.
- **Balance** (future settlement phase) is shown **both** vs order total and vs delivered value. A negative balance displays as "Credit remaining".
- **Payments and barter:** installments/payments and barter credits are **separate** collections.
- **No auth, no backend yet.** Persistence goes behind an `OrderRepository` interface.
- **Localization:** all UI strings live in one i18n dictionary (`en` first; pt-BR later).
- **Copy:** use 3D-print / workshop language. No grocery or cart language, icons, checkboxes or strike-through.
- **User workflow (global CLAUDE.md):**
  - work one phase at a time and stop for confirmation after each
  - run `/ship-phase cm` when a phase is commit-sized
  - never push to main; work on a feature branch

## Priority Next Steps
1. `git init` and create branch `feat/order-screen-mvp`.
2. Scaffold with `create-next-app` in the current dir (ts, tailwind, eslint, app, src-dir), then add Vitest.
3. Domain layer + tests:
   - `src/domain/types.ts`
   - `src/domain/money.ts`
   - `src/domain/calc.ts`
   - `src/domain/validation.ts`
4. `src/data/orderRepository.ts` (mock with board-game-shop seed items) and `src/state/useOrder.ts` (useReducer).
5. Components:
   - `AppHeader`
   - `OrderSummary`
   - `ItemForm`
   - `ItemList` / `CategoryGroup` / `ItemRow`
   - `StatusBadge`
6. Wire everything up in `src/app/page.tsx`.
7. Verify:
   - run `npm test`, `npm run lint` and `npm run build`
   - do a manual check at a ~390px width
8. Stop for review, then `/ship-phase cm`.

## Relevant Files and Directories
- `~/.claude-personal/plans/you-are-helping-me-atomic-comet.md`: the detailed plan for this phase (file layout, validation rules, style direction, verification steps). **Read this first.**
- Project root: `/Users/fegvilela/Documents/projects/my/3d/list3d`

## Open Questions / Pending Decisions
- **"Item count" meaning:** the plan assumes it counts line items. The alternative is to sum quantities (pieces). Confirm with the user, or show pieces as secondary text.
- **"Editable category" meaning:** the plan assumes a free-text category input with a datalist of existing categories. Renaming a whole group inline is not planned.
- **Deferred to later phases:** settlement/barter UI, multi-order list, localStorage persistence, share links, pt-BR translation.
