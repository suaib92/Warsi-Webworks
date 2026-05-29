# DESIGN_RULES.md
> Paste this file into your project root. Reference it in every AI prompt with: "Follow DESIGN_RULES.md strictly."

---

## Who this site is
A premium digital agency. Dark theme. Midnight Violet accent. The vibe is: expensive, technical, confident. NOT startup-bubbly, NOT SaaS-purple-gradient, NOT Bootstrap.

---

## Color system — use only these values

```css
--bg-base:        #0a0a0f;   /* page background */
--bg-surface:     #13131f;   /* alternate sections */
--bg-card:        #1c1c2e;   /* cards, panels */
--bg-card-hover:  #22223a;   /* card hover state */

--border-subtle:  #2a2a40;   /* card borders */
--border-section: #1e1e30;   /* section dividers */

--text-primary:   #e2e2ff;   /* headings */
--text-body:      #c4c4e0;   /* paragraphs, 15px min, line-height 1.7 */
--text-muted:     #8888aa;   /* labels, captions */
--text-disabled:  #555555;   /* never use below this on dark bg */

--accent:         #6c63ff;   /* CTA buttons ONLY */
--accent-light:   #a78bfa;   /* icons, underlines, decorative borders */
```

**Hard rules:**
- Never use `#000000` as a background
- Never use pure `#ffffff` text on cards — use `--text-primary` only for headings
- `--accent` violet goes on ONE element per section max (the button)
- Never use the same violet for both decoration and CTAs — they must be different stops

---

## Typography

```css
font-size: 15px minimum for all body text
line-height: 1.7 for paragraphs
line-height: 1.2 for display headings

/* scale */
--text-xs:   12px;
--text-sm:   13px;
--text-base: 15px;
--text-lg:   18px;
--text-xl:   24px;
--text-2xl:  32px;
--text-hero: clamp(40px, 6vw, 72px);
```

**Hard rules:**
- Never set body text below `#888888` — it fails WCAG AA
- Hero heading stays white, large, bold. Do not touch it.
- Section labels (small uppercase): `--text-muted`, 11px, letter-spacing 0.08em

---

## Section layout

Every section alternates background:
```
Section 1 → --bg-base    (#0a0a0f)
Section 2 → --bg-surface (#13131f)
Section 3 → --bg-base    (#0a0a0f)
...repeat
```

Separate with `border-top: 1px solid var(--border-section)` — never leave two sections with no visual break.

---

## Cards

```css
background: var(--bg-card);
border: 1px solid var(--border-subtle);
border-radius: 12px;
padding: 1.5rem;
transition: background 0.15s ease;

&:hover {
  background: var(--bg-card-hover);
  border-color: #6c63ff44;
}
```

No box-shadows. No glows. No gradients inside cards. Depth comes from background contrast, not effects.

---

## Buttons

```css
/* Primary CTA */
background: var(--accent);
color: #ffffff;
font-weight: 600;
padding: 12px 28px;
border-radius: 8px;
border: none;
/* hover: bg #7c73ff */

/* Secondary / Ghost */
background: transparent;
color: var(--text-primary);
border: 1px solid var(--border-subtle);
padding: 11px 27px;
border-radius: 8px;
/* hover: border-color var(--accent), color var(--accent-light) */
```

Only one primary CTA visible at a time per screen viewport. If there are two accents on screen, something is wrong.

---

## What to never generate

- Purple gradients of any kind (or any gradients at all)
- Glassmorphism / frosted glass effects
- `Inter` or `Roboto` as primary font
- Neon glows or colored drop-shadows
- Lottie animations of generic icons (rockets, lightbulbs)
- Stock illustration style graphics
- Cards with white backgrounds on this dark theme
- Blue links styled like default browser links
- Any element using `#000000` as background
- Yellow/Gold colors entirely

---

## Contrast check

Before shipping any text color, verify:
- Body text (`#c4c4e0` on `#0a0a0f`) = 12.3:1 ✅
- Muted text (`#8888aa` on `#0a0a0f`) = 5.3:1 ✅
- Never go below 4.5:1 for any readable text

Tool: https://webaim.org/resources/contrastchecker/

---

## How to use this file in AI prompts

Always prepend your prompt with:

> "You are editing a premium dark-theme agency website. Follow DESIGN_RULES.md strictly. Do not introduce new colors, fonts, or effects not listed there. Do not use AI default aesthetics."
