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

## Typography

Source Sans 3 (UI/body) + Source Serif 4 (display) — clearer hierarchy than Inter/Playfair defaults.
