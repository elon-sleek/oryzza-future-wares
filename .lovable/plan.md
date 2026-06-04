# Plan — Impact section + icon & inclusion fixes

## 1. Fix product icons (spoons & trays)

In `src/Home.tsx` the `products` array currently uses generic shapes:
- Spoons → `Utensils` (reads as fork/knife pair)
- Trays → `Soup` (reads as a bowl)

Swap to clearer lucide icons:
- Spoons → `Soup` (the lucide "Soup" glyph is actually a spoon-in-bowl; better: use the dedicated `Croissant`? No.) → use **`Soup`** is still ambiguous. Pick **`UtensilsCrossed` → no**. Best fit in lucide-react is the lab icon, but to stay in the main set use a custom inline SVG spoon. Plan: add two small inline SVG components (`SpoonIcon`, `TrayIcon`) at the top of the file and reference them from the `products` array exactly like the lucide icons (same props: `size`, `className`).
  - `SpoonIcon`: oval bowl + tapered handle.
  - `TrayIcon`: rounded rectangle with two side handles.

## 2. Impact section — real numbers from the 3-ton run

Baseline fact: **3 tonnes of agro-biomass → 7,830 Swoon spoons.**

Derived figures (shown with short "how we got there" footnote under the grid):

| Metric | Value | Basis |
|---|---|---|
| Biomass upcycled | **3 tonnes** | actual production run |
| Swoon spoons produced | **7,830 pcs** | actual |
| Plastic-spoon equivalent kept out of litter | **7,830 single-use plastic spoons** | 1 Swoon replaces 1 plastic spoon |
| Petrochemical plastic avoided | **~11.7 kg** | 7,830 × ~1.5 g/plastic spoon |
| CO₂ emissions avoided vs. open-burning the biomass | **~4.5 tonnes CO₂e** | IPCC ~1.5 t CO₂ per t dry agro-residue burnt × 3 t |
| Water saved vs. conventional moulded-fibre line | **~31,300 litres** | conventional ≈ 5 L/spoon-equivalent; we use 80% less → 4 L × 7,830 |

Implementation:
- Add a new **"Our impact so far"** band right above the existing percentage stats (or replace the current `1 tonne` / `0g` tiles).
- Reuse the existing `Stat` component with count-up animation. New tiles:
  - `3` suffix `" t"` — "of agro-biomass upcycled into ware."
  - `7,830` — "Swoon spoons pressed in our first flagship run."
  - `7,830` — "single-use plastic spoons kept out of drains and landfill."
  - `11.7` suffix `" kg"` — "petrochemical plastic avoided."
  - `4.5` suffix `" t CO₂e"` — "emissions avoided vs. open-burning the same biomass."
  - `31,300` suffix `" L"` — "water saved vs. a conventional moulded-fibre line."
- Keep the existing percentage tiles (80% water, 100% usable, 100% recyclable, 100% biodegradable) below as the "always-true" claims.
- Extend `useCountUp` to handle decimals (e.g. `4.5`, `11.7`) by passing a `decimals` prop; currently it only formats integers.

Heading copy: "From one production run." Sub-copy: "3 tonnes of rice husk, sawdust, bagasse and coir — pressed, not burned."

Tiny footnote under the grid: "Estimates based on IPCC open-burning emission factors, an average 1.5 g plastic spoon, and an 80% water reduction vs. conventional moulded-fibre pulp lines."

## 3. Equal-opportunity / women agro-processors note

Add a short band (between Impact and FAQ) titled **"An equal-opportunity press."**

Copy (draft):
> Oryzza is an equal-opportunity operation. Our supply chain leans deliberately on **women agro-processors** — the millers, huskers and drying-yard collectives whose work has long been undercounted. Every tonne of biomass we press goes through their hands first, and is paid for at the gate.

Visual: two-column layout — left text, right a small stat ("≥50% of biomass sourced through women-led processors") and a `Users` lucide icon.

## 4. Files touched

- `src/Home.tsx` — only file changed. Adds: `SpoonIcon`, `TrayIcon` inline SVGs; updates `products` array; extends `useCountUp` / `Stat` to support decimals and comma-formatting; adds Impact band copy + new `Stat` tiles; adds Equal-Opportunity section.

No new dependencies, no routing changes, no backend.
