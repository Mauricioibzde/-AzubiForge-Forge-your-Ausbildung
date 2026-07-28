# Color & contrast system

**Updated:** 2026-07-28

## Color psychology (study / AP1)

| Role | Hue | Why |
|---|---|---|
| Primary | Forest teal | Focus, growth, calm confidence for long study sessions |
| Accent | Warm amber | Attention / milestones only — never body copy |
| Neutrals | Cool green-gray | Low eye strain; clear elevation between page / card / hover |
| Danger / success | Desaturated red / green | Status without neon distraction |

## Contrast rules

- Body text (`--text`) and secondary text (`--muted`) target **WCAG AA** on `--surface` / `--surface-soft`.
- Amber fill (`--accent`) is for chips/borders/fills. Text on surfaces uses **`--accent-ink`**.
- Buttons on primary fills use **`--on-primary`** (not a hardcoded dark ink that fails in light mode).
- Borders use `--line` / `--line-strong` (dark theme was ~5% white — nearly invisible; now ~14–24%).

## Tokens to prefer

```css
color: var(--text);          /* titles, primary copy */
color: var(--muted);         /* captions, aux */
color: var(--accent-ink);    /* amber labels on surfaces */
color: var(--on-primary);    /* text on primary buttons */
border-color: var(--line-strong); /* interactive outlines */
```

## Buttons

- Radius: `--btn-radius` (14px) — not pill/full-round
- Primary: gradient + inset highlight, `--on-primary` text
- Secondary: surface + strong border; hover tints toward primary
- Ghost: quiet until hover
- Accent: amber gradient with dark ink (`#1a1208`) for contrast
- States: `:hover` lift, `:active` press, `:focus-visible` ring, disabled muted

Prefer classes: `.button`, `.button.secondary`, `.button.ghost`, `.button.accent`, `.button.large`.
