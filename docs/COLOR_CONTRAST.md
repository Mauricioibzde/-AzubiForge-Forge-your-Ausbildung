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
- Primary button text is always **white** on deep teal (`--primary-deep`).
- Borders use `--line` / `--line-strong`.

## Tokens to prefer

```css
color: var(--text);          /* titles, primary copy */
color: var(--muted);         /* captions, aux */
color: var(--accent-ink);    /* amber labels on surfaces */
color: var(--on-primary);    /* text on primary buttons — always white */
color: var(--on-accent);     /* text on amber buttons — near black */
border-color: var(--line-strong);
```

## Buttons

| Variant | Fill | Text | Meaning |
|---|---|---|---|
| Primary (`.button`) | Deep teal (`--primary-deep`) | White | Main action |
| Secondary | Surface | `--text` | Alternative |
| Ghost | Transparent + border | `--text` | Low emphasis |
| Accent | Amber | Near-black | Highlighted CTA |
| Complete / Acertei | Deep green | White | Success |

Hard rules:
- Never use `--primary-dark` (mint heading tint in dark mode) as a button fill.
- Solid `background` first; gradient only as `background-image` enhancement.
- No `color-mix` on critical button text/fill pairs.
- Every variant sets `color` explicitly for `a.button` / `label.button` too.

## Typography

Source Sans 3 (UI/body) + Source Serif 4 (display).
